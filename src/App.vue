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
    let W = (window.innerWidth || document.body.clientWidth) - 50;
    let H = (window.innerHeight || document.body.clientHeight) - 50;

    this.$el.style.height = `${H}px`;
    this.$el.style.width = `${W}px`;
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

#show img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
