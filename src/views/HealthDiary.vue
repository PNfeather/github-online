<template>
  <div class="health-diary">
    <!-- 城市选择器 -->
    <van-cell-group inset>
      <van-field
        label="🏙️ 选择城市"
        :border="false"
        readonly
        clickable
        v-model="cityName"
        input-align="right"
        @click="showPopup = true"
      />
    </van-cell-group>

    <van-popup v-model:show="showPopup" round position="bottom">
      <van-picker :columns="cityColumns" @confirm="onCityConfirm" @cancel="showPopup = false" />
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
        placeholder="请输入~"
        clearable
        v-for="meal in meals"
        :key="meal.key"
        :label="meal.label"
        v-model="formData[meal.key]"
        input-align="right"
      />
    </van-cell-group>

    <van-cell-group inset style="margin-top: 10px">
      <!-- 睡眠记录 -->
      <van-field
        @input="saveToLocalStorage"
        placeholder="请输入~"
        clearable
        label="💤 睡眠记录"
        v-model="formData.sleepRecord"
        input-align="right"
      />
      <!-- 情绪状态 -->
      <van-field
        @input="saveToLocalStorage"
        placeholder="请输入~"
        clearable
        label="😊 情绪状态"
        v-model="formData.emotionalState"
        input-align="right"
      />
    </van-cell-group>

    <!-- 护肤流程 -->
    <van-cell-group inset title="🧴 护肤流程">
      <van-field
        @input="saveToLocalStorage"
        placeholder="请输入~"
        clearable
        v-for="skin in skincare"
        :key="skin.key"
        :label="skin.label"
        v-model="formData[skin.key]"
        input-align="right"
      />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Field as VanField,
  CellGroup as VanCellGroup,
  Popup as VanPopup,
  Picker as VanPicker,
} from 'vant'

const WEATHER_API_KEY = 'mj7fby77br.re.qweatherapi.com'
const preKey = 'QIU_DAN_APP_DATA'

interface WeatherData {
  text: string
  temp: string
  humidity: string
}

// 城市选择
const cityId = ref<string>('101280601')
const cities = [
  { id: '101280601', name: '深圳' },
  { id: '101250801', name: '益阳' },
]

const showPopup = ref(false)
const cityColumns = cities.map((city) => ({ text: city.name, value: city.id }))

const cityName = computed(() => {
  const city = cities.find((city) => city.id === cityId.value)
  return city ? city.name : ''
})

const onCityConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
  const [selectedCityId] = selectedValues
  cityId.value = selectedCityId
  showPopup.value = false
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

// 初始化
onMounted(() => {
  loadFromLocalStorage()
  fetchWeather()
})
</script>

<style lang="less" scoped>
.health-diary {
  background-color: #fff8f0;
  font-family: 'Comic Sans MS', cursive;
  padding: 10px;
  margin: 0;
  font-size: 14px;
  --van-cell-group-inset-padding: 0;
  --van-cell-group-inset-title-padding: 10px 0;
  --van-cell-group-title-color: #222;

  :deep(.van-cell-group) {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .weather {
    display: flex;
    justify-content: space-between;
  }

  .text-red-500 {
    color: #ef4444;
  }
}
</style>
