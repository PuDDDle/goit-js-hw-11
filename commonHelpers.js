import{i as u,S as f}from"./assets/vendor-7659544d.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();const m=document.querySelector("form"),i=document.querySelector(".gallery"),c=document.querySelector(".loader");let n;m.addEventListener("submit",o=>{o.preventDefault(),n=o.target.elements.search.value,n!==""&&(i.innerHTML="",c.style.display="block",h(n).then(e=>{p(e.hits)}).catch(e=>{console.error(e)}).finally(()=>{c.style.display="none"}),o.target.reset())});function h(o){const e=new URLSearchParams({key:"42475549-5790b83c0c5f71da4ba61553f",q:`${o}`,image_type:"photo",orientation:"horizontal",safesearch:"true"}),l="https://pixabay.com",a="/api/",t=`?${e}`,r=l+a+t;return fetch(r).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})}function d(o){return o.map(e=>`<li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img
          class="gallery-image"
          src="${e.webformatURL}"
          alt="${e.tags}"
          width="360"
        />
      </a>
      <ul class="thumb-block">
        <li class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${e.likes}</p>
        </li>
        <li class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${e.views}</p>
        </li>
        <li class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${e.comments}</p>
        </li>
        <li class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${e.downloads}</p>
        </li>
      </ul>
    </li>`).join("")}function p(o){if(o.length===0){u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topCenter"});return}const e=d(o);i.insertAdjacentHTML("beforeend",e),new f(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
