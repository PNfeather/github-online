<template>
  <div class="health-diary">
    <!-- 城市选择器 -->
    <van-cell-group inset>
      <van-field label="🏙️ 选择城市" :border="false">
        <select v-model="cityId" @change="fetchWeather">
          <option v-for="city in cities" :key="city.id" :value="city.id" :label="city.name" />
        </select>
      </van-field>
    </van-cell-group>

    <!-- 天气信息 -->
    <van-cell-group inset>
      <van-cell title="☀️ 今日天气">
        <div v-if="weather.loading">加载中...</div>
        <div v-else-if="weather.error">{{ weather.error }}</div>
        <div v-else>
          <p class="text-xs">天气: {{ weather.data.text }}</p>
          <p class="text-xs">温度: {{ weather.data.temp }}℃</p>
          <p class="text-xs">湿度: {{ weather.data.humidity }}%</p>
        </div>
      </van-cell>
    </van-cell-group>

    <!-- 饮食记录 -->
    <van-cell-group inset title="🍽️ 饮食记录">
      <van-field v-for="meal in meals" :key="meal.key" :label="meal.label">
        <input v-model="meal.key" input-align="right" />
      </van-field>
    </van-cell-group>

    <!-- 睡眠记录 -->
    <van-cell-group inset>
      <van-field label="💤 睡眠记录">
        <input v-model="formData.sleepRecord" input-align="right" />
      </van-field>
    </van-cell-group>

    <!-- 情绪状态 -->
    <van-cell-group inset>
      <van-field label="😊 情绪状态">
        <input v-model="formData.emotionalState" input-align="right" />
      </van-field>
    </van-cell-group>

    <!-- 护肤流程 -->
    <van-cell-group inset title="🧴 护肤流程">
      <van-field v-for="skin in skincare" :key="skin.key" :label="skin.label">
        <input v-model="skin.key" input-align="right" />
      </van-field>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Field as VanField, CellGroup as VanCellGroup, Cell as VanCell } from 'vant'

const WEATHER_API_KEY = 'mj7fby77br.re.qweatherapi.com'
const preKey = 'QIU_DAN_APP_DATA'

interface WeatherData {
  text: string
  temp: string
  humidity: string
}

const cityId = ref<string>('101280601')
const weather = ref<{
  loading: boolean
  error: string | null
  data: WeatherData | null
}>({
  loading: true,
  error: null,
  data: null,
})

const cities = [
  { id: '101280601', name: '深圳' },
  { id: '101250801', name: '益阳' },
]

const meals = [
  { key: 'breakfast', label: '早餐' },
  { key: 'lunch', label: '午餐' },
  { key: 'supper', label: '晚餐' },
  { key: 'otherFoods', label: '其他' },
]

const skincare = [
  { key: 'skinCareMorning', label: '早上' },
  { key: 'skinCareNoon', label: '中午' },
  { key: 'skinCareDask', label: '傍晚' },
  { key: 'skinCareNight', label: '晚上' },
]

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

// 获取天气数据
function fetchWeather() {
  weather.value.loading = true
  weather.value.error = null

  fetch(`https://${WEATHER_API_KEY}/v7/weather/now?location=${cityId.value}`, {
    headers: {
      'X-QW-Api-Key': 'c5e38186de324e7c963b41be0436321a',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      weather.value.data = {
        text: data.now.text,
        temp: data.now.temp,
        humidity: data.now.humidity,
      }
      weather.value.loading = false
    })
    .catch((err) => {
      console.error(err)
      weather.value.error = '天气信息加载失败'
      weather.value.loading = false
    })
}

// 加载缓存数据
function loadFromLocalStorage() {
  Object.keys(formData.value).forEach((key) => {
    const value = localStorage.getItem(`${preKey}_${key}`)
    if (value !== null) {
      formData.value[key as keyof typeof formData.value] = value
    }
  })
}

// 保存到缓存数据
function saveToLocalStorage() {
  Object.keys(formData.value).forEach((key) => {
    localStorage.setItem(`${preKey}_${key}`, formData.value[key as keyof typeof formData.value])
  })
}

// 初始化
onMounted(() => {
  loadFromLocalStorage()
  fetchWeather()
})
</script>

<style lang="less" scoped>
.health-diary {
  background: #fff8f0;
  font-family: 'Comic Sans MS', cursive;
  padding: 1rem;
  margin: 0;
  font-size: 14px;

  h1,
  h4 {
    font-weight: bold;
    margin: 0;
  }

  .text-center {
    text-align: center;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .font-bold {
    font-weight: bold;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .p-2 {
    padding: 0.5rem;
  }

  .rounded-xl {
    border-radius: 0.75rem;
  }

  .border {
    border: 1px solid #ccc;
  }

  .shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .bg-white {
    background-color: white;
  }

  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .w-full {
    width: 100%;
  }

  .block {
    display: block;
  }

  .text-xs {
    font-size: 0.75rem;
  }

  .font-medium {
    font-weight: 500;
  }

  .whitespace-nowrap {
    white-space: nowrap;
  }

  .my-auto {
    margin-top: auto;
    margin-bottom: auto;
  }

  .opacity-100 {
    opacity: 1;
  }

  .opacity-60 {
    opacity: 0.6;
  }

  .text-gray-200 {
    color: #e5e5e5;
  }

  .transition-all {
    transition: all 0.3s ease;
  }

  .duration-200 {
    transition-duration: 200ms;
  }

  input,
  textarea,
  select {
    font-size: 0.8rem;
    padding: 0.2rem;
  }

  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.125rem;
  }

  .card {
    background: white;
    padding: 0.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 0.5rem;
  }

  .form-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .form-control label {
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    margin: 0;
  }

  input,
  select {
    font-size: 0.8rem;
    padding: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
  }
}
</style>
