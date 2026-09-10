import { restaurantlist } from "./restaurant_list.js";

const readRestaurantAllFromJSFile = async (tag) => {
  const tempDocs = [];
  restaurantlist.forEach((doc) => {
    if (!doc.name.includes(tag) && !doc.tags.includes(tag)) {
      return;
    }
    const d = {};
    d.name = doc.name;
    d.tags = doc.tags;
    d.review = doc.review;
    tempDocs.push(d);
  });
  return tempDocs;
};

const makeSearchURL = (name) => {
  return `https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&q=${name}`;
};

const readRestaurantAll = async (tag) => {
  if (tag === undefined) {
    tag = "";
  }

  const tempDocs = await readRestaurantAllFromJSFile(tag);

  let html = "";
  if (tempDocs.length === 0) {
    html = `
<div class="flex flex-col items-center justify-center px-4 py-24 text-center">
  <i class="ri-restaurant-line text-5xl text-gray-600" aria-hidden="true"></i>
  <p class="mt-5 text-lg font-medium text-gray-300">검색 결과가 없습니다</p>
  <p class="mt-1.5 text-sm text-gray-500">다른 키워드로 다시 검색해 보세요</p>
</div>`;
  } else {
    html = `<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">`;
    for (const d of tempDocs) {
      const searchURL = makeSearchURL(d.name);
      let reviewTag = "";
      if (d.review != null && d.review.length > 0) {
        reviewTag = `<a href="${d.review}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-md bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-gray-600">
  <i class="ri-article-line" aria-hidden="true"></i>리뷰
</a>`;
      }
      html += `
<div class="flex h-full flex-col rounded-xl bg-gray-800 ring-1 ring-white/10">
  <div class="flex items-start gap-2.5 border-b border-white/5 p-4">
    <i class="ri-restaurant-line mt-0.5 text-lg text-sky-400" aria-hidden="true"></i>
    <h4 class="text-base font-semibold leading-snug text-white">${d.name}</h4>
  </div>
  <div class="flex flex-1 flex-col p-4">
    <div class="flex flex-wrap gap-1.5">${d.tags
      .split(",")
      .map(
        (t) =>
          `<span tabindex="0" role="button" class="restaurant-tag cursor-pointer rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400 ring-1 ring-white/10 hover:bg-white/10 hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">${t.trim()}</span>`,
      )
      .join("")}</div>
    <div class="mt-auto flex items-center gap-2 pt-4">
      ${reviewTag}
      <a href="${searchURL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-md bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-gray-600">
        <i class="ri-search-line" aria-hidden="true"></i>검색
      </a>
    </div>
  </div>
</div>
`;
    }
    html += `</div>`;
  }
  document.getElementById("html_out").innerHTML = html;
  document.getElementById("restaurant_cnt").innerHTML = `${tempDocs.length}개`;
  document.querySelectorAll(".restaurant-tag").forEach((el) => {
    const handleTagClick = () => {
      const tagText = el.textContent;
      document.getElementById("search_restaurant_input").value = tagText;
      history.pushState(
        null,
        "",
        `/restaurant?q=${encodeURIComponent(tagText)}`,
      );
      readRestaurantAll(tagText);
    };
    el.addEventListener("click", handleTagClick);
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleTagClick();
      }
    });
  });
};

//innerHTML 로 dom 변경은 window.onload 로 보장할 수 없다.
//window.onload = function () {
export const restaurantAddEventListener = (initialTag = "") => {
  document
    .getElementById("search_restaurant_input")
    .addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search_restaurant_button").click();
      }
    });
  document
    .getElementById("search_restaurant_button")
    .addEventListener("click", () => {
      readRestaurantAll(
        document.getElementById("search_restaurant_input").value,
      );
    });
  readRestaurantAll(initialTag);
};
