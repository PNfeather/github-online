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
          input-align="right"
          placeholder="请选择~"
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
    <div class="footer">
      <van-button type="primary" class="btn" size="small" @click="captureAndSave"
        >保存为图片</van-button
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Field as VanField,
  CellGroup as VanCellGroup,
  Popup as VanPopup,
  Picker as VanPicker,
  Button as VanButton,
  showToast,
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

// 城市选择
const cityId = ref<string>('')

const showPopup = ref(false)

const cityName = computed(() => {
  const city = citys.find((city) => city.value === cityId.value)
  return city ? city.text : ''
})

//  城市选择确认
const onCityConfirm = ({ selectedOptions }: { selectedOptions: Adress[] }) => {
  const [, city] = selectedOptions
  cityId.value = city.value
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
    text-align: center;
    width: 100%;
    padding-bottom: calc(30px + @safe-area-inset-bottom);
    .btn {
      margin: 20px auto 0;
    }
  }
}
</style>
