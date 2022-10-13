<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div ref="items"
        class="infinite-list-item" 
        v-for="item in visibleData" 
        :key="item.id"
        :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
      >{{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
let d = [];
for (let i = 0; i < 10000; i++) {
  d.push({ id: i, value: i });
}
export default {
   data() {
    return {
      //可视区域高度
      screenHeight:0,
      //偏移量
      startOffset:0,
      //起始索引
      start:0,
      //结束索引
      end:null,
    };
  },
  props: {
    //所有列表数据
    listData:{
    },
    //每项高度
    itemSize: {
      type: Number,
      default:100
    }
  },
  computed:{
    //列表总高度
    listHeight(){
      return d.length * this.itemSize;
    },
    //可显示的列表项数
    visibleCount(){
             // 网页可视区域高度 除去 每一项的高度 等于 网页最多可以显示的条数
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    //偏移量对应的style
    getTransform(){
      // return `translate3d(0,${this.startOffset}px,0)`;
      return `translatey(${this.startOffset}px)`;
    },
    //获取真实显示列表数据
    visibleData(){
                    //   起始索引         
      return d.slice(this.start, Math.min(this.end,d.length));
    }
  },
  mounted() { 
    // clientHeight 网页可视区域的高度
    this.screenHeight = this.$refs.list.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
    // console.log(this.visibleCount,123);
  },
 
  methods: {
    scrollEvent() {
      //当前滚动位置   scrollTop 滚动的距离
      let scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引      偏移值除去每一项的距离 等于位移了多少格     结果可用于筛选的初始值
      this.start = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
                //  初始值 加上 可视区域可以显示的条数 等于结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量 用户滚轮偏移值
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    }
  }
};
</script>


<style scoped>

.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>