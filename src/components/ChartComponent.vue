<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default {
  name: 'ChartComponent',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Data Points',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/get_data')
        const data = await response.json()
        this.chartData.labels = data.map((_, index) => index + 1)
        this.chartData.datasets[0].data = data.map(point => point[1])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  height: 400px;
}
</style>