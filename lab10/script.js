async function getimg() {
    const apiKey = "ca370d51a054836007519a00ff4ce59e";
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=10&format=json&nojsoncallback=1`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      const photos = data.photos.photo;
  
      const gallery = document.getElementById("gallery");
      gallery.innerHTML = '';
  
      photos.forEach(photo => {
        const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;
        const img = document.createElement("img");
        img.src = imgUrl;
        gallery.appendChild(img);
      });
    } catch (err) {
      console.error("圖片載入失敗：", err);
    }
  }
  