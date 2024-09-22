<template>
  <div class="chart-wrapper">
    <div class="chart-container">
      <Scatter
        v-if="chartData.datasets[0].data.length > 0"
        :data="chartData"
        :options="chartOptions"
        :key="chartKey"
      />
      <p v-else>Loading data...</p>
    </div>
    <button @click="fetchData" class="refresh-button">Refresh Data</button>
  </div>
</template>

<script>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { Scatter } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale, CategoryScale)

import { onMounted, reactive, ref } from 'vue';

export default {
  name: 'ChartComponent',
  components: { Scatter },
  setup() {
    const chartData = reactive({
      datasets: [
        {
          label: 'Data Points',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    })

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        },
        y: {
          type: 'linear'
        }
      }
    }

    const chartKey = ref(0)

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/get_data')
        const data = await response.json()
        console.log('Fetched Data:', data)
        chartData.datasets[0].data = data.map(point => ({ x: point[0], y: point[1] }))
        // Increment the key to force re-render
        chartKey.value += 1
        console.log('Transformed Data:', chartData.datasets[0].data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(fetchData)

    return { chartData, chartOptions, fetchData, chartKey }
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
  width: 80vh;
  height: 40vh; /* 80% of the viewport height */
  max-width: none; /* Remove max-width restriction */
}

.refresh-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.refresh-button:hover {
  background-color: #45a049;
}
</style>