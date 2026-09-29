<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import TopBar from '../components/TopBar.vue'
</script>

<template>
  <Sidebar />
  <main class="min-h-screen lg:ml-64">
    <TopBar />
    <router-view />
  </main>
</template>
