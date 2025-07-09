<script lang="ts" setup>
import { Pie, Bar, PolarArea } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale
} from 'chart.js'

import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()

onMounted(async () => {
  await productStore.getTopProduct()

  chartData.value = {
    labels: productStore.labels,
    datasets: [
      {
        backgroundColor: ['#c78283', '#f3d9dc', '#d7bea8', '#b49286', '#744253'],
        data: productStore.data
      }
    ]
  }
})

const chartData = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: ['#c78283', '#f3d9dc', '#d7bea8', '#b49286', '#744253'],
      data: []
    }
  ]
})

const chartOptions = {
  responsive: true
}
//------------------------------------------------
const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: ['#4f7cac'],
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}
const options = {
  responsive: true,
  maintainAspectRatio: false
}

//-----------------------
const data2 = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
}

const options2 = {
  responsive: true,
  maintainAspectRatio: false
}

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale
)
</script>
<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <v-card height="140"
          ><v-sheet height="140" width="100" color="#CE93D8"
            ><v-icon icon="mdi-account" color="white" size="60"></v-icon>member</v-sheet
          ></v-card
        >
      </v-col>
      <v-col md="3">
        <v-card height="140"><v-sheet height="140" width="100" color="#B39DDB"> </v-sheet></v-card>
      </v-col>
      <v-col md="3">
        <v-card height="140"><v-sheet height="140" width="100" color="#9FA8DA"></v-sheet></v-card>
      </v-col>
      <v-col md="3">
        <v-card height="140"><v-sheet height="140" width="100" color="#90CAF9"></v-sheet></v-card>
      </v-col>

      <v-col md="6">
        <v-card height="400px" style="display: flex; justify-content: center">
          <Pie id="my-chart-id" :options="chartOptions" :data="chartData" /></v-card
      ></v-col>
      <v-col md="6">
        <v-card height="400px"> <PolarArea :data="data2" :options="options2" /></v-card
      ></v-col>
      <v-col md="12">
        <v-card height="500px"> <Bar :data="data" :options="options" /></v-card
      ></v-col>
    </v-row>
  </v-container>
</template>
