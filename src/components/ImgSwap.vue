<template>
  <div id="canvas"></div>
</template>

<script>
export default {
  name: "img-swap",
  props: {
    src: String,
    transitions: []
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
  watch: {
    src: function(val) {
      // get current image
      let current = this.$el.querySelector("img");

      // load new image
      let image = new Image();
      image.src = val;
      image.classList.add("animated", "fadeIn");

      // when image is finished loading then...
      image.decode().then(() => {
        // determine the ratio (percentage difference): (nw/sw = x/100) => 100(nw/sw) = x
        let wP = Math.ceil((image.naturalWidth / this.screenW) * 100);
        let hP = Math.ceil((image.naturalHeight / this.screenH) * 100);

        // determine height width ratio in comparison to the screen's
        console.log(`${this.screenW}/${this.screenH}`);
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
          // need to expand image
          // determine the ratio (percentage difference): (nw/sw = x/100) => 100(nw/sw) = x
          /*
          let wP = Math.ceil((this.screenW / image.naturalWidth) * 100);
          let hP = Math.ceil((this.screenH / image.naturalHeight) * 100);
          */

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
          }
        }

        // remove the current image and...
        if (current) current.classList.add("fadeOutUpBig", "slow");
        setTimeout(() => {
          if (current) current.remove();
          // add the new image
          this.$el.appendChild(image);
        }, 2000);
      });
    } // src
  }
};
</script>

<style lang="stylus" scoped>
@import '~animate.css/animate.css';
</style>
