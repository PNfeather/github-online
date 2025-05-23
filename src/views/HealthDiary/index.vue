<template>
  <section class="page">
    <div class="health-diary" ref="healthDiary">
      <!-- 城市选择器 -->
      <van-cell-group inset>
        <van-field
          label="🏙️ 选择城市"
          :border="false"
          readonly
          clickable
          v-model="cityName"
          placeholder="请选择~"
          @click="showCityPickerPopup = true"
        />
      </van-cell-group>

      <van-popup v-model:show="showCityPickerPopup" round position="bottom">
        <van-picker
          :columns="cityColumns"
          @confirm="onCityConfirm"
          @cancel="showCityPickerPopup = false"
        />
      </van-popup>

      <!-- 天气信息 -->
      <van-cell-group inset style="margin-top: 10px">
        <van-cell title="☀️ 今日天气"> </van-cell>
        <van-cell>
          <div v-if="weather.loading">加载中...</div>
          <div v-else-if="weather.error" class="text-red-500">{{ weather.error }}</div>
          <div v-else class="weather">
            <p>天气: {{ weather.data?.text }}</p>
            <p>温度: {{ weather.data?.temp }}℃</p>
            <p>湿度: {{ weather.data?.humidity }}%</p>
          </div>
        </van-cell>
      </van-cell-group>

      <!-- 饮食记录 -->
      <van-cell-group inset title="🍽️ 饮食记录">
        <van-field
          @input="saveToLocalStorage"
          rows="1"
          autosize
          type="textarea"
          :placeholder="`请输入${meal.label}~`"
          clearable
          v-for="meal in meals"
          :key="meal.key"
          :label="meal.label"
          v-model="formData[meal.key]"
        />
      </van-cell-group>

      <van-cell-group inset style="margin-top: 10px">
        <!-- 睡眠记录 -->
        <van-field
          @input="saveToLocalStorage"
          rows="1"
          autosize
          type="textarea"
          :placeholder="`请输入睡眠记录~`"
          clearable
          label="💤 睡眠记录"
          v-model="formData.sleepRecord"
        />
        <!-- 情绪状态 -->
        <van-field
          @input="saveToLocalStorage"
          rows="1"
          autosize
          type="textarea"
          :placeholder="`请输入情绪状态~`"
          clearable
          label="😊 情绪状态"
          v-model="formData.emotionalState"
        />
      </van-cell-group>

      <!-- 护肤流程 -->
      <van-cell-group inset title="🧴 护肤流程">
        <van-field
          @input="saveToLocalStorage"
          rows="1"
          autosize
          type="textarea"
          :placeholder="`请输入${skin.label}~`"
          clearable
          v-for="skin in skincare"
          :key="skin.key"
          :label="skin.label"
          v-model="formData[skin.key]"
        />
      </van-cell-group>
    </div>
    <div class="footer">
      <van-button v-if="false" type="primary" class="btn" size="small" @click="captureAndSave"
        >保存</van-button
      >
      <img class="ai-img" src="./images/OIP-C (1).jpeg" alt="" @click="analyzeWithAI" />
      <van-icon class="icon" name="comment" v-if="aiAdvice" @click="showAdvancePopup = true" />
    </div>
  </section>
  <!-- ai建议弹窗 -->
  <van-popup
    v-model:show="showAdvancePopup"
    round
    position="center"
    :close-on-click-overlay="false"
  >
    <transition name="popup-slide">
      <div class="advance-popup-content" v-show="showAdvancePopup" ref="popupContent">
        <van-icon class="close-icon" name="close" @click="showAdvancePopup = false" />
        <div class="advance-popup-title">AI建议:</div>
        <div class="advance-wrapper">
          <p class="advance-content" v-text="aiAdvice"></p>
        </div>
      </div>
    </transition>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Field as VanField,
  CellGroup as VanCellGroup,
  Popup as VanPopup,
  Picker as VanPicker,
  Button as VanButton,
  Icon as VanIcon,
  showToast,
  showLoadingToast,
  closeToast,
} from 'vant'
import html2canvas from 'html2canvas'
import moment from 'moment'
import axios from 'axios'
import cityColumns, { citys } from './data/city'

const WEATHER_API_KEY = 'mj7fby77br.re.qweatherapi.com'
const preKey = 'QIU_DAN_APP_DATA'

interface WeatherData {
  text: string
  temp: string
  humidity: string
}

interface Adress {
  text: string
  value: string
  children?: Adress[]
}

// 需要截图元素
const healthDiary = ref()

// ai建议弹窗元素
const popupContent = ref()

// 城市选择
const cityId = ref<string>('')

// ai建议
const aiAdvice = ref<string>('')

// 城市选择弹窗
const showCityPickerPopup = ref(false)

// 建议弹窗
const showAdvancePopup = ref(false)

// 城市名称
const cityName = computed(() => {
  const city = citys.find((city) => city.value === cityId.value)
  return city ? city.text : ''
})

//  城市选择确认
const onCityConfirm = ({ selectedOptions }: { selectedOptions: Adress[] }) => {
  const [, city] = selectedOptions
  cityId.value = city.value
  showCityPickerPopup.value = false
  fetchWeather()
}

// 天气状态
const weather = ref<{
  loading: boolean
  error: string | null
  data: WeatherData | null
}>({
  loading: true,
  error: null,
  data: null,
})

// 表单数据
const formData = ref({
  breakfast: '',
  lunch: '',
  supper: '',
  otherFoods: '',
  sleepRecord: '',
  emotionalState: '',
  skinCareMorning: '',
  skinCareNoon: '',
  skinCareDask: '',
  skinCareNight: '',
})

// 饮食记录项
const meals = [
  { key: 'breakfast', label: '早餐' },
  { key: 'lunch', label: '午餐' },
  { key: 'supper', label: '晚餐' },
  { key: 'otherFoods', label: '其他' },
] as const

// 护肤流程项
const skincare = [
  { key: 'skinCareMorning', label: '早上' },
  { key: 'skinCareNoon', label: '中午' },
  { key: 'skinCareDask', label: '傍晚' },
  { key: 'skinCareNight', label: '晚上' },
] as const

// 获取天气数据
const fetchWeather = async () => {
  weather.value.loading = true
  weather.value.error = null

  try {
    const res = await fetch(`https://${WEATHER_API_KEY}/v7/weather/now?location=${cityId.value}`, {
      headers: {
        'X-QW-Api-Key': 'c5e38186de324e7c963b41be0436321a',
      },
    })
    const data = await res.json()

    if (data.code !== '200') throw new Error('天气数据获取失败')

    weather.value.data = {
      text: data.now.text,
      temp: data.now.temp,
      humidity: data.now.humidity,
    }
  } catch (err) {
    console.error(err)
    weather.value.error = '天气信息加载失败'
  } finally {
    weather.value.loading = false
  }
}

// 加载缓存数据
const loadFromLocalStorage = () => {
  Object.keys(formData.value).forEach((key) => {
    const value = localStorage.getItem(`${preKey}_${key}`)
    if (value !== null) {
      formData.value[key as keyof typeof formData.value] = value
    }
  })
}

// 保存到缓存数据
const saveToLocalStorage = () => {
  Object.keys(formData.value).forEach((key) => {
    localStorage.setItem(`${preKey}_${key}`, formData.value[key as keyof typeof formData.value])
  })
}

//  截图
const captureAndSave = async () => {
  if (!healthDiary.value) return

  try {
    const canvas = await html2canvas(healthDiary.value, {
      scale: 2, //放大
      onclone: (clone) => {
        clone.querySelectorAll('input').forEach((input) => {
          input.parentElement.style.position = 'relative'
          input.style.position = 'absolute'
          input.style.top = '-9px'
          input.style.height = '50px'
          input.style.lineHeight = '50px'
          input.style.paddingTop = '0px'
        })
      },
    })
    const image = canvas.toDataURL('image/png')
    // 创建 a 标签用于下载
    const link = document.createElement('a')
    const date = moment().format('YYYY-MM-DD')
    link.href = image
    link.download = `健康日记记录${date}.png`
    link.click()
  } catch (err) {
    console.error('截图失败:', err)
    showToast('截图保存失败，请重试')
  }
}

// 配置高德地图 Web 服务 API Key
const AMap_API_KEY = '597f98db74a4bcdf878c3273cd6cec43'
// 获取当前位置并设置城市
const fetchCurrentLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // 使用高德地图逆地理编码 API 获取城市信息
          const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
            params: {
              key: AMap_API_KEY,
              location: `${longitude},${latitude}`,
              extensions: 'all',
              output: 'JSON',
            },
          })

          const data = res.data
          if (data.status === '1') {
            const cityInfo = data.regeocode.addressComponent
            const cityName = cityInfo.city || cityInfo.province
            const matchedCity = citys.find((city) => city.text === cityName)

            if (matchedCity) {
              cityId.value = matchedCity.value
              fetchWeather()
            } else {
              showToast(`未找到对应的城市：${cityName}，请手动选择`)
            }
          } else {
            showToast('无法获取地理位置信息，请手动选择')
          }
        } catch (err) {
          console.error('获取位置失败:', err)
          showToast('获取位置失败，请检查网络或权限')
        }
      },
      (error) => {
        console.error('定位失败:', error.message)
        showToast('定位失败，请手动选择城市')
      },
    )
  } else {
    showToast('您的浏览器不支持地理位置功能')
  }
}

// ai分析
const analyzeWithAI = async () => {
  const prompt = `
    你是一个健康管理助手，请根据以下信息提供个性化建议：

    饮食记录：
    早餐：${formData.value.breakfast}
    午餐：${formData.value.lunch}
    晚餐：${formData.value.supper}
    其他食物：${formData.value.otherFoods}

    睡眠记录：${formData.value.sleepRecord}
    情绪状态：${formData.value.emotionalState}

    护肤流程：
    早上：${formData.value.skinCareMorning}
    中午：${formData.value.skinCareNoon}
    傍晚：${formData.value.skinCareDask}
    晚上：${formData.value.skinCareNight}

    天气情况：
    天气：${weather.value.data?.text || '未知'}
    温度：${weather.value.data?.temp || '未知'}℃
    湿度：${weather.value.data?.humidity || '未知'}%

    请从以下几个方面给出建议：
    1. 饮食营养是否均衡
    2. 睡眠质量评估
    3. 情绪是否稳定
    4. 护肤流程是否合理

    格式要求：
    - 分点列出
    - 用中文简洁说明
    `
  try {
    showLoadingToast({
      message: '分析中...',
      forbidClick: true,
    })
    const response = await fetch('/tongyi/ai/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk-c44937c3cb7a4298a9b53148df306b03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        input: {
          prompt,
        },
      }),
    })
    closeToast()

    if (!response.ok) throw new Error('AI 分析失败')

    const result = await response.json()
    aiAdvice.value = result.output.text
    showAdvancePopup.value = true
  } catch (err) {
    console.error('AI 请求出错:', err)
    showToast('AI 健康分析失败')
  }
}

// 初始化
onMounted(() => {
  loadFromLocalStorage()
  fetchCurrentLocation()
})
</script>

<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  :deep(.health-diary) {
    background-color: #fff8f0;
    font-family: 'Comic Sans MS', cursive;
    padding: 18px 10px;
    margin: 0;
    font-size: 14px;
    --van-cell-group-inset-padding: 0;
    --van-cell-group-inset-title-padding: 10px 0;
    --van-cell-group-title-color: #222;

    .van-cell-group {
      border: 1px solid #eee;
    }

    .weather {
      display: flex;
      justify-content: space-between;
    }

    .text-red-500 {
      color: #ef4444;
    }
  }
  .footer {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    flex-grow: 12px;
    padding-bottom: calc(30px + @safe-area-inset-bottom);
    gap: 12px;
    .ai-img {
      width: auto;
      height: 30px;
      border-radius: 50%;
    }
    .icon {
      font-size: 30px;
      color: rgb(210, 140, 60);
    }
    .btn {
      width: 100px;
    }
  }
}
.advance-popup-content {
  padding: 12px;
  position: relative;
  width: 90vw;
  font-family: 'Comic Sans MS', cursive;
  .close-icon {
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: 20px;
  }
  .advance-popup-title {
    font-size: 16px;
    font-weight: bold;
  }
  .advance-wrapper {
    margin-top: 12px;
    position: relative;
    padding-bottom: 2px;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
    }
    .advance-content {
      font-size: 12px;
      line-height: 1.2;
      word-break: break-all;
      white-space: pre-wrap;
      max-height: 90vh;
      overflow-y: auto;
      padding-bottom: 30px;
    }
  }
}
.popup-slide-enter-active,
.popup-slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.popup-slide-enter-from {
  opacity: 0;
  transform: scale(0.8) translate(-20px, -20px);
}
.popup-slide-leave-to {
  opacity: 0;
  transform: scale(0.6) translate(100px, 100px);
}
</style>
