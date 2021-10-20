<template>
  <div class="scroll-container" ref="container">
    <div class="scroll-content" :style="`height:${contentHeight}px`">
      <div class="translate" :style="`transform:translateY(${translateY}px)`">
        <div class="item" v-for="(item, index) in list" :key="index"
        >
          元素{{ item.i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { throttle } from '@/utils/tools'

// 模拟数据
const data = ref(Array.from({length:1000}))
// 滚动容器
const container = ref(null)
// 滚动容器高度
const containerHeight = ref(0)
// 列表项高度
const itemHeight = ref(30)
const itemHeightPx = computed(() => itemHeight.value + 'px')
// 列表总高度
const contentHeight = computed(() => itemHeight.value * data.value.length)
// 滚动高度
const scrollTop = ref(0)
// 可视区前后补白数量
const padNum = ref(5)
const padTopNum = computed(() => Math.min(padNum.value, Math.floor(scrollTop.value / itemHeight.value)))
// 渲染列表偏移量
const translateY = computed(() => (Math.floor(scrollTop.value / itemHeight.value) - padTopNum.value) * itemHeight.value)
// 可视区渲染数量
const itemNum = computed(() => Math.ceil(containerHeight.value / itemHeight.value))
// 渲染节点总数 前补白 + 可视区 + 后补白
const num = computed(() => padTopNum.value + itemNum.value + padNum.value)
// 渲染节点开始索引
const startIndex = computed(() => {
  return translateY.value > 0
    ? translateY.value / itemHeight.value
    : 0
})
// 渲染节点列表
const list = computed(() => {
  return data.value.slice(startIndex.value, startIndex.value + num.value).map((item, index) => ({i: startIndex.value + index + 1}))
})

onMounted(() => {
  containerHeight.value = container.value.getBoundingClientRect().height
  container.value.addEventListener('scroll', throttle((e) => {
    scrollTop.value = e.target.scrollTop
  }, 100))
})

</script>

<style scoped lang="stylus">
.scroll-container
  margin-top 100px
  height 400px
  overflow-y auto
  border 1px solid #123
.item
  width 100%
  height v-bind('itemHeightPx')
</style>