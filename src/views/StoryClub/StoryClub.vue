<template>
  <div class="voice-clone-container">
    <!-- 1. 录音模块 -->
    <van-cell-group title="1. 录制参考音频" inset>
      <van-cell>
        <template #title>
          <div class="record-hint">请录制 5-20 秒清晰的语音，环境尽量安静</div>
        </template>
      </van-cell>
      <van-cell>
        <template #value>
          <div class="record-controls">
            <div v-if="isRecording" class="recording-indicator">
              <span class="recording-dot"></span>
              <span class="recording-time">{{ recordingDuration }}s</span>
            </div>
            <van-button
              :type="isRecording ? 'danger' : 'primary'"
              size="large"
              block
              @click="isRecording ? stopRecording() : startRecording()"
            >
              {{ isRecording ? '⏹️ 停止录音' : '🎤 开始录音' }}
            </van-button>
          </div>
        </template>
      </van-cell>
      <van-cell v-if="audioBlob && !isRecording">
        <template #value>
          <div class="status-text">✅ 录音已就绪 ({{ (audioBlob.size / 1024).toFixed(1) }} KB)</div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 2. 克隆模块 -->
    <van-cell-group title="2. 克隆音色" inset>
      <van-cell>
        <template #value>
          <van-button
            type="success"
            size="large"
            block
            :loading="loading && step === 'clone'"
            :disabled="!audioBlob || loading"
            @click="cloneVoice"
          >
            {{ loading && step === 'clone' ? '正在训练模型...' : '🚀 立即克隆' }}
          </van-button>
        </template>
      </van-cell>
      <van-cell v-if="voiceId">
        <template #value>
          <div class="success-badge">
            <van-icon name="success" color="#07c160" />
            <span>音色ID: {{ voiceId.substring(0, 8) }}...</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 3. TTS 模块 -->
    <van-cell-group v-if="voiceId" title="3. 生成语音" inset class="fade-in">
      <van-cell>
        <van-field
          v-model="text"
          type="textarea"
          placeholder="请输入想要生成的文本内容..."
          rows="4"
          autosize
          show-word-limit
          maxlength="500"
        />
      </van-cell>
      <van-cell>
        <van-button
          type="primary"
          size="large"
          block
          :loading="loading && step === 'tts'"
          :disabled="loading"
          @click="synthesizeVoice"
        >
          {{ loading && step === 'tts' ? '正在生成音频...' : '🔊 试听声音' }}
        </van-button>
      </van-cell>
      <van-cell v-if="generatedAudioUrl" title="生成的音频">
        <template #value>
          <div class="audio-card">
            <div class="audio-wrapper">
              <audio controls preload="metadata" :src="generatedAudioUrl"></audio>
            </div>
            <van-button type="primary" size="small" :href="generatedAudioUrl" download="minimax_voice.mp3">
              下载音频
            </van-button>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Button as VanButton,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Field as VanField,
  Icon as VanIcon,
  showToast,
} from 'vant'
import { getVoiceId } from '@/views/api.ts'

// --- 状态定义 ---
const audioBlob = ref(null)
const voiceId = ref(null)
const isRecording = ref(false)
const recordingDuration = ref(0)
let recordingTimer: ReturnType<typeof setInterval> | null = null
const loading = ref(false)
const step = ref('') // 'clone' | 'tts'
const text = ref('你好，这是通过 Vue 3 和 MiniMax 克隆出来的声音，效果非常逼真。')
const generatedAudioUrl = ref(null)

// 录音相关变量
let mediaRecorder = null
let audioChunks = []

// --- 录音逻辑 ---
const startRecording = async () => {
  recordingDuration.value = 0
  recordingTimer = setInterval(() => {
    recordingDuration.value++
  }, 1000)
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    audioChunks = []

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/mp3' })
      audioBlob.value = blob
      // 重置之前的结果
      voiceId.value = null
      generatedAudioUrl.value = null
    }

    mediaRecorder.start()
    isRecording.value = true
  } catch (err) {
    showToast('无法访问麦克风，请检查权限设置')
    console.error(err)
  }
}

const stopRecording = () => {
  if (recordingTimer) {
    clearInterval(recordingTimer)
    recordingTimer = null
  }
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop()
    isRecording.value = false
  }
}

// --- API 调用逻辑 ---

// 1. 克隆声音
const cloneVoice = async () => {
  if (!audioBlob.value) return

  loading.value = true
  step.value = 'clone'

  const formData = new FormData()
  // 注意：文件名最好以 .mp3 结尾
  formData.append('audio', audioBlob.value, 'sample_voice.mp3')
  formData.append('voiceName', 'VueUserVoice')

  try {
    const response = await getVoiceId(formData)

    const data = await response.json()

    if (data.success) {
      voiceId.value = data.voice_id
      showToast('声音克隆成功！')
    } else {
      showToast('克隆失败: ' + (data.error || '未知错误'))
    }
  } catch (error) {
    console.error('Clone Error:', error)
    showToast('服务器连接失败')
  } finally {
    loading.value = false
    step.value = ''
  }
}

// 2. 生成语音 (TTS)
const synthesizeVoice = async () => {
  if (!voiceId.value || !text.value) return

  loading.value = true
  step.value = 'tts'

  try {
    const response = await fetch('/api/voice/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.value,
        voice_id: voiceId.value,
      }),
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      generatedAudioUrl.value = url
    } else {
      showToast('生成失败，请检查后端日志')
    }
  } catch (error) {
    console.error('TTS Error:', error)
  } finally {
    loading.value = false
    step.value = ''
  }
}
</script>

<style scoped lang="less">
.voice-clone-container {
  padding: 12px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  background: #f7f8fa;
  min-height: 100vh;
}

.record-hint {
  font-size: 13px;
  color: #969799;
  line-height: 1.4;
}

.record-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.recording-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #ee0a24;
}

.recording-dot {
  width: 8px;
  height: 8px;
  background: #ee0a24;
  border-radius: 50%;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.recording-time {
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.status-text {
  font-size: 14px;
  color: #07c160;
  text-align: center;
  padding: 4px 0;
}

.success-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #07c160;
}

.audio-card {
  background: #f7f8fa;
  border-radius: 8px;
  padding: 12px;
  .audio-wrapper {
    margin-bottom: 12px;
    audio {
      width: 100%;
      height: 40px;
      border-radius: 4px;
    }
  }
  .van-button {
    width: 100%;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
