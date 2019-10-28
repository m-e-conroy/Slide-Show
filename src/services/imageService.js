export default class ImageSrvc {
  db = [];
  used = [];

  async getDB() {
    const request = new Request("/assets/json/images.json", { method: "GET" });

    await fetch(request)
      .then(resp => {
        if (resp.status === 200) return resp.json();
        else throw new Error("Failed to retrieve images database.");
      })
      .then(resp => {
        this.db = resp;
      })
      .catch(error => {
        console.error(error);
        return [];
      });
  } // getDB

  next() {
    let i = Math.floor(Math.random() * Math.floor(this.db.length));
    let img = this.db.splice(i, 1); // remove from db
    this.used.push(img[0]); // put in used
    if (this.db.length <= 0) {
      this.db = [...this.used];
      this.used = [];
    }
    return img;
  } // get next
} // ImageSrvc
