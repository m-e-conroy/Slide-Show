<template>
  <div id="canvas">
    <div class="shadow"></div>
  </div>
</template>

<script>
export default {
  name: "img-swap",
  props: {
    src: String,
    transitions: Array
  },
  data: function() {
    return {
      shadow: null,
      enterAnimations: [
        "bounceIn",
        "bounceInDown",
        "bounceInUp",
        "bounceInLeft",
        "bounceInRight",
        "fadeIn",
        "fadeInDown",
        "fadeInDownBig",
        "fadeInLeft",
        "fadeInLeftBig",
        "fadeInRight",
        "fadeInRightBig",
        "fadeInUp",
        "fadeInUpBig",
        "flipInX",
        "flipInY",
        "lightSpeedIn",
        "rotateIn",
        "rotateInDownLeft",
        "rotateInDownRight",
        "rotateInUpLeft",
        "rotateInUpRight",
        "rollIn",
        "zoomIn",
        "zoomInDown",
        "zoomInLeft",
        "zoomInRight",
        "zoomInUp",
        "slideInDown",
        "slideInLeft",
        "slideInRight",
        "slideInUp"
      ],
      leaveAnimations: [
        "bounceOut",
        "bounceOutDown",
        "bounceOutUp",
        "bounceOutLeft",
        "bounceOutRight",
        "fadeOut",
        "fadeOutDown",
        "fadeOutDownBig",
        "fadeOutLeft",
        "fadeOutLeftBig",
        "fadeOutRight",
        "fadeOutRightBig",
        "fadeOutUp",
        "fadeOutUpBig",
        "flipOutX",
        "flipOutY",
        "rotateOut",
        "rotateOutDownLeft",
        "rotateOutDownRight",
        "rotateOutUpLeft",
        "rotateOutUpRight",
        "rollOut",
        "zoomOut",
        "zoomOutDown",
        "zoomOutLeft",
        "zoomOutRight",
        "zoomOutUp",
        "slideOutDown",
        "slideOutLeft",
        "slideOutRight",
        "slideOutUp"
      ]
    };
  },
  computed: {
    screenW: function() {
      let W = window.innerWidth || document.body.clientWidth;
      return W - 50;
    },
    screenH: function() {
      let H = window.innerHeight || document.body.clientHeight;
      return H - 50;
    }
  },
  mounted() {
    this.shadow = this.$el.querySelector(".shadow");
  }, // mounted
  watch: {
    src: function(val) {
      // get current image
      let current = this.$el.querySelector("img");

      // load new image
      let image = new Image();
      image.src = val;
      let enterAnim = this.enterAnimations[
        Math.floor(Math.random() * Math.floor(this.enterAnimations.length))
      ];
      image.classList.add("animated", "slow", enterAnim); // add random enter animation

      // when image is finished loading then...
      image.decode().then(() => {
        // determine the ratio (percentage difference): (nw/sw = x/100) => 100(nw/sw) = x
        let wP = Math.ceil((image.naturalWidth / this.screenW) * 100);
        let hP = Math.ceil((image.naturalHeight / this.screenH) * 100);

        /*
        console.info(`Screen W: ${this.screenW}, ScreenH: ${this.screenH}`);
        console.info(`wP: ${wP}, hP: ${hP}`);
        console.info(`W: ${image.naturalWidth}, H: ${image.naturalHeight}`);
        */

        // determine height width ratio in comparison to the screen's
        if (
          image.naturalWidth > this.screenW ||
          image.naturalHeight > this.screenH
        ) {
          // need to shrink image
          if (
            image.naturalWidth > this.screenW &&
            image.naturalHeight > this.screenH
          ) {
            if (wP > hP) {
              // use wP
              image.width = Math.floor((100 / wP) * image.naturalWidth);
              image.height = Math.floor((100 / wP) * image.naturalHeight);
            } else {
              // use hP
              image.width = Math.floor((100 / hP) * image.naturalWidth);
              image.height = Math.floor((100 / hP) * image.naturalHeight);
            }
          } else if (image.naturalWidth > this.screenW) {
            image.width = this.screenW;
            image.height = Math.floor((100 / wP) * image.naturalHeight);
          } else if (image.naturalHeight > this.screenH) {
            image.width = Math.floor((100 / hP) * image.naturalWidth);
            image.height = this.screenH;
          }
        } else {
          console.log("EXPANDING");

          if (wP > hP) {
            console.log("...BY WIDTH");
            image.width = this.screenW;
            image.height = Math.floor(
              (image.naturalHeight * this.screenW) / image.naturalWidth
            );
          } else {
            console.log("...BY HEIGHT");
            image.height = this.screenH;
            image.width = Math.floor(
              (image.naturalWidth * this.screenH) / image.naturalHeight
            );
          } // if
        } // if

        let margin = 0;
        if (image.height < this.screenH)
          margin = Math.abs(this.screenH - image.height) / 2;

        // remove the current image and...
        let leaveAnim = this.leaveAnimations[
          Math.floor(Math.random() * Math.floor(this.leaveAnimations.length))
        ];
        if (current) current.classList.add(leaveAnim); // add random leave animation
        setTimeout(() => {
          if (current) current.remove();
          image.style.marginTop = `${margin}px`;
          this.$el.prepend(image);
        }, 2000); // setTimeout
      });
    } // src
  } // watch
};
</script>

<style lang="stylus" scoped>
@import '~animate.css/animate.css';
.shadow
  postion absolute
  top 0
  left 0
  width 100%
  height 100%
  box-shadow inset 0px 0px 20px 30px rgba(0,0,0,1.0)
</style>
