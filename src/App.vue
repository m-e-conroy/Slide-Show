<template>
  <div id="show" @click="onOff()">
    <img-swap :src="image"></img-swap>
  </div>
</template>

<script>
import ImgSwap from "./components/ImgSwap";
import ImageSrvc from "./services/imageService";

const Images = new ImageSrvc();

export default {
  name: "slide-show",
  data: function() {
    return {
      presentationInterval: null,
      image: ""
    };
  },
  async mounted() {
    this.$el.style.height = `${window.screen.height - 50}px`;
    this.$el.style.width = `${window.screen.width - 50}px`;
    await Images.getDB();
  },
  components: {
    ImgSwap
  },
  methods: {
    onOff: function() {
      if (this.presentationInterval) {
        clearInterval(this.presentationInterval);
        this.presentationInterval = null;
        console.log("%c OFF ", "background-color: #900; color: #fff");
      } else {
        console.log("%c ON ", "background-color: #090; color: #fff");
        if (!this.presentationInterval)
          this.image = `assets/img/${Images.next()}`;
        this.presentationInterval = setInterval(() => {
          this.image = `assets/img/${Images.next()}`;
        }, 10000);
      }
    }
  } // methods
};
</script>

<style lang="stylus">
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

#show {
  position: absolute;
  top: 25px;
  left: 25px;
  /* border: 2px solid #fff; */
  overflow: hidden;
}

#show::after {
  box-shadow: inset 0px 0px 30px -10px rgba(0, 0, 0, 0.75);
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
}

#show img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
