<template>
  <div id="window">
    <div id="show" @click="onOff()">
      <img-swap :src="image"></img-swap>
    </div>
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
    let show = document.querySelector("#show");
    let W = window.innerWidth || document.body.clientWidth;
    let H = window.innerHeight || document.body.clientHeight;

    this.$el.style.height = `${H}px`;
    this.$el.style.width = `${W}px`;
    show.style.height = `${H -50}px`;
    show.style.width = `${W -50}px`;

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
        }, 12000);
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

#window {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  background: linear-gradient(270deg, #485fbf, #2b906d, #e3613a);
  background-size: 600% 600%;

  -webkit-animation: AnimationName 45s ease infinite;
  -moz-animation: AnimationName 45s ease infinite;
  animation: AnimationName 45s ease infinite;

  @keyframes AnimationName {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
}

#show {
  position: absolute;
  top: 25px;
  left: 25px;
}

#show img, #show div.shadow {
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: -15px 15px 30px -4px rgba(0,0,0,0.75);
}
</style>
