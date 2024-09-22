<template>
  <div class="chart-wrapper">
    <div class="chart-container">
      <Scatter
        v-if="chartData.datasets[0].data.length > 0"
        :key="chartKey"
        :data="chartData"
        :options="chartOptions"
      />
      <p v-else>Loading data...</p>
    </div>
    <button class="refresh-button" @click="fetchData">Refresh Data</button>

    <div>
      <input
        ref="fileInput"
        type="file"
        accept=".xlsx"
        style="display: none"
        @change="handleFileUpload"
      />
      <button class="upload-button" @click="triggerFileUpload">
        Upload File
      </button>
    </div>

    <div class="chart-controls">
      <input v-model="numPoints" type="number" placeholder="Number of points" />
      <input v-model="minValue" type="number" placeholder="Min value" />
      <input v-model="maxValue" type="number" placeholder="Max value" />
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios' // Add this import
  import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
  } from 'chart.js'
  import { onMounted, reactive, ref } from 'vue'
  import { Scatter } from 'vue-chartjs'

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    LinearScale,
    CategoryScale
  )

  const chartData = reactive({
    datasets: [
      {
        label: null, // Set label to null to remove it without affecting colors
        data: [],
        backgroundColor: '#affb23',
        borderColor: '#affa23',
        borderWidth: 1,
      },
    ],
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          font: {
            size: 20,
          },
        },
      },
      y: {
        type: 'linear',
        ticks: {
          font: {
            size: 20,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
      },
    },
  }

  const chartKey = ref(0)
  const fileInput = ref(null)

  const numPoints = ref(100)
  const minValue = ref(0)
  const maxValue = ref(100)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/get_random_data?num_points=${numPoints.value}&min_value=${minValue.value}&max_value=${maxValue.value}`
      )
      const data = await response.json()
      chartData.datasets[0].data = data.map(([x, y]) => ({ x, y }))
      chartKey.value++
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  onMounted(fetchData)

  const triggerFileUpload = () => {
    fileInput.value.click()
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      console.log('No file selected')
      return
    }

    if (!file.name.endsWith('.xlsx')) {
      alert('Please upload only Excel files (.xlsx)')
      if (event.target) {
        event.target.value = ''
      }
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'http://localhost:3000/upload_file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response.data)
      // Uncomment the following line if you want to refresh data after upload
      // await fetchData()
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    }
  }
</script>

<style scoped>
  .chart-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .chart-container {
    width: 100vh;
    height: 60vh;
    max-width: none;
  }

  .refresh-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 34px;
  }

  .refresh-button:hover {
    background-color: #45a049;
  }

  .upload-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #008cba;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .upload-button:hover {
    background-color: #007b9a;
  }

  .chart-controls {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }

  .chart-controls input {
    padding: 5px;
    font-size: 16px;
  }
</style>
