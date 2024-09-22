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

<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { onMounted, reactive, ref } from 'vue';
import { Scatter } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale, CategoryScale);

const chartData = reactive({
  datasets: [
    {
      label: 'Data Points',
      backgroundColor: '#affb23',
      data: []
    }
  ]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      ticks: {
        font: {
          size: 20
        }
      }
    },
    y: {
      type: 'linear',
      ticks: {
        font: {
          size: 20
        }
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 16
        }
      }
    },
    tooltip: {
      bodyFont: {
        size: 14
      }
    }
  }
};

const chartKey = ref(0);

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/get_data');
    const data = await response.json();
    chartData.datasets[0].data = data.map(([x, y]) => ({ x, y }));
    chartKey.value++;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
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
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 34px;
}

.refresh-button:hover {
  background-color: #45a049;
}
</style>