<script setup lang="ts">
interface Point {
  x: number;
  y: number;
}

import { computed } from "vue";
import moduleTitle from "../components/moduleTitle.vue";
import useComponnetsStore from "@/pinia/components";
import useMainStore from "@/pinia/main";

const mainStore = useMainStore();
const componentsStore = useComponnetsStore();
const activedItem = computed(() => componentsStore.activedItem);

const perimeter = (r: number): number => {
  return Math.PI * 2 * r;
};

const centerPoint = (borderLen: number): Point => {
  return {
    x: borderLen / 2,
    y: borderLen / 2,
  };
};
</script>

<template>
  <moduleTitle type="h5" :title="activedItem?.label || '--'"></moduleTitle>
  <!-- 1行 -->
  <div class="papper">
    <div class="num">1</div>
    <div class="loading1">
      <svg width="100" height="100">
        <circle
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="20"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(20)"
        ></circle>
      </svg>
    </div>
    <div class="loading2">
      <svg width="100" height="100">
        <circle
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="20"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(20) * 2"
        ></circle>
      </svg>
    </div>
    <div class="loading3">
      <svg width="100" height="100">
        <circle
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="20"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(20)"
        ></circle>
      </svg>
    </div>
  </div>
  <div class="papper">
    <div class="num">2</div>
    <div class="loading4">
      <svg width="100" height="100">
        <circle
          class="circle1"
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="20"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(20)"
        ></circle>
        <circle
          class="circle2"
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="18"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(12)"
        ></circle>
        <circle
          class="circle3"
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="16"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(6)"
        ></circle>
      </svg>
    </div>
    <div class="loading5">
      <svg width="100" height="100">
        <circle
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="20"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(5)"
        ></circle>
      </svg>
    </div>
    <div class="loading6">
      <svg width="100" height="100">
        <circle
          class="circle1"
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="20"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(20)"
        ></circle>
        <circle
          class="circle2"
          :cx="centerPoint(100).x"
          :cy="centerPoint(100).y"
          r="18"
          stroke="#ffffff"
          fill="transparent"
          :stroke-dasharray="perimeter(18)"
        ></circle>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.papper {
  background-color: var(--el-text-color-primary);
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  position: relative;
  .num {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
  }
  .loading1 {
    svg {
      transform: rotate(-90deg);
    }
    circle {
      animation: loading1_anit linear infinite 3s;
      stroke-dashoffset: calc(PI * 2 * 20);
      @keyframes loading1_anit {
        to {
          stroke-dashoffset: 0;
        }
      }
    }
  }
  .loading2 {
    svg {
      transform: rotate(-90deg);
    }
    circle {
      animation: loading2_anit1 linear infinite 3s;
      stroke-dashoffset: calc(PI * 2 * 20) * 2;
      @keyframes loading2_anit1 {
        to {
          stroke-dashoffset: 0;
        }
      }
    }
  }
  .loading3 {
    svg {
      transform: rotate(-90deg);
    }
    circle {
      animation: loading3_anit1 linear infinite 3s;
      @keyframes loading3_anit1 {
        0% {
          stroke-dashoffset: calc(PI * 2 * 20);
        }
        50% {
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dashoffset: calc(PI * 2 * 20);
        }
      }
    }
  }

  .loading4 {
    svg {
      transform: rotate(-90deg);
    }
    .circle1 {
      animation: loading4_ani1 linear infinite 3s;
      stroke-dashoffset: calc(PI * 2 * 20);
      @keyframes loading4_ani1 {
        to {
          stroke-dashoffset: 0;
        }
      }
    }
    .circle2 {
      animation: loading4_ani2 linear infinite 3s;
      stroke-dashoffset: calc(PI * 2 * 18);
      @keyframes loading4_ani2 {
        to {
          stroke-dashoffset: 0;
        }
      }
    }
    .circle3 {
      animation: loading4_ani3 linear infinite 3s;
      stroke-dashoffset: calc(PI * 2 * 16);
      @keyframes loading4_ani3 {
        to {
          stroke-dashoffset: 0;
        }
      }
    }
  }
  .loading5 {
    svg {
      transform: rotate(-90deg);
      animation: loading5_ani1 linear infinite 3s;
      @keyframes loading5_ani1 {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
  .loading6 {
    svg {
      transform: rotate(-90deg);
    }
    .circle1 {
      animation: loading6_ani1 linear infinite 3s;
      stroke-dashoffset: calc(PI * 2 * 20);
      @keyframes loading6_ani1 {
        to {
          stroke-dashoffset: 0;
        }
      }
    }
    .circle2 {
      animation: loading6_ani2 linear infinite 3s;
      stroke-dashoffset: 0;
      @keyframes loading6_ani2 {
        to {
          stroke-dashoffset: calc(PI * 2 * 18) / 2;
        }
      }
    }
  }
}
</style>
