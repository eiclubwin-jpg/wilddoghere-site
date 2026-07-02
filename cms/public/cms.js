const state = {
  posts: [],
  meta: {
    categories: [],
    narrators: [],
    statuses: []
  },
  currentId: null,
  imageUpload: null
};

const form = document.querySelector("#postForm");
const postList = document.querySelector("#postList");
const searchInput = document.querySelector("#searchInput");
const imageInput = document.querySelector("#imageInput");
const imagePreview = document.querySelector("#imagePreview");
const imageFallback = document.querySelector("#imageFallback");
const previewCard = document.querySelector("#previewCard");
const saveState = document.querySelector("#saveState");
const buildOutput = document.querySelector("#buildOutput");
const bodyEditor = document.querySelector("#bodyEditor");
const inlineImageInput = document.querySelector("#inlineImageInput");

async function readJson(response) {
  if (response.status === 401) {
    window.location.href = "/login";
    throw new Error("請先登入後台。");
  }

  return response.json();
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFormData() {
  const data = new FormData(form);
  return {
    id: data.get("slug"),
    title: data.get("title"),
    slug: data.get("slug"),
    category: data.get("category"),
    excerpt: data.get("excerpt"),
    coverImage: data.get("coverImage"),
    imageAlt: data.get("imageAlt"),
    narrator: data.get("narrator"),
    date: data.get("date"),
    tags: String(data.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    bodyHtml: bodyEditor.innerHTML.trim(),
    platform: data.get("platform"),
    link: data.get("link"),
    featured: data.get("featured") === "on",
    status: data.get("status")
  };
}

function setOptions(name, values) {
  const select = form.elements[name];
  select.innerHTML = values
    .map((value) => `<option value="${value}">${value}</option>`)
    .join("");
}

function setFormData(post) {
  form.elements.title.value = post.title || "";
  form.elements.slug.value = post.slug || "";
  form.elements.category.value = post.category || state.meta.categories[0];
  form.elements.excerpt.value = post.excerpt || "";
  form.elements.coverImage.value = post.coverImage || "";
  form.elements.imageAlt.value = post.imageAlt || "";
  form.elements.narrator.value = post.narrator || state.meta.narrators[0];
  form.elements.date.value = post.date || new Date().toISOString().slice(0, 10);
  form.elements.tags.value = Array.isArray(post.tags) ? post.tags.join(", ") : "";
  bodyEditor.innerHTML = post.bodyHtml || "";
  form.elements.bodyHtml.value = post.bodyHtml || "";
  form.elements.platform.value = post.platform || "Mobile01";
  form.elements.link.value = post.link || "#";
  form.elements.featured.checked = Boolean(post.featured);
  form.elements.status.value = post.status || "draft";
  state.currentId = post.id || post.slug || null;
  state.imageUpload = null;
  imageInput.value = "";
  updatePreview();
  updateImagePreview();
  saveState.textContent = "尚未儲存";
}

function newPost() {
  const today = new Date().toISOString().slice(0, 10);
  setFormData({
    id: "",
    title: "",
    slug: "",
    category: "野狗日常",
    excerpt: "",
    coverImage: "",
    imageAlt: "",
    narrator: "野狗軍團",
    date: today,
    tags: [],
    platform: "Mobile01",
    link: "#",
    featured: false,
    status: "draft"
  });
}

function renderList() {
  const keyword = searchInput.value.trim().toLowerCase();
  const posts = state.posts.filter((post) => {
    const haystack = [
      post.title,
      post.category,
      post.platform,
      post.narrator,
      ...(post.tags || [])
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(keyword);
  });

  postList.innerHTML = posts
    .map(
      (post) => `
        <button class="post-button ${post.id === state.currentId ? "active" : ""}" data-id="${post.id}">
          <strong>${post.title || "未命名文章"}</strong>
          <span>${post.category} · ${post.date} · ${post.status}</span>
        </button>
      `
    )
    .join("");
}

function updateImagePreview() {
  const src = form.elements.coverImage.value;
  if (!src) {
    imagePreview.removeAttribute("src");
    imagePreview.style.display = "none";
    imageFallback.style.display = "block";
    return;
  }

  imagePreview.src = src;
  imagePreview.style.display = "block";
  imageFallback.style.display = "none";
}

function updatePreview() {
  const post = getFormData();
  const imageHtml = post.coverImage
    ? `<img src="${post.coverImage}" alt="${post.imageAlt || ""}" onerror="this.style.display='none'" />`
    : "";
  const tags = post.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
  const action =
    post.status === "published" && post.link && post.link !== "#"
      ? "閱讀更多"
      : "內容準備中";
  const body = post.bodyHtml
    ? `<div class="preview-content">${post.bodyHtml}</div>`
    : `<div class="preview-content"><p>文章內文預覽會顯示在這裡。</p></div>`;

  previewCard.innerHTML = `
    <div class="preview-image">
      <div class="preview-fallback">${post.category || "文章縮圖"}</div>
      ${imageHtml}
    </div>
    <div class="preview-body">
      <div class="chips">
        <span class="chip">${post.category || "未分類"}</span>
        <span class="chip">${post.date || ""}</span>
      </div>
      <h3>${post.title || "文章標題"}</h3>
      <div class="meta">
        <span>敘事者：${post.narrator || ""}</span>
        <span>平台：${post.platform || ""}</span>
      </div>
      <p>${post.excerpt || "文章摘要會顯示在這裡。"}</p>
      <div class="tags">${tags}</div>
      ${body}
      <p><strong>${action}</strong></p>
    </div>
  `;
}

async function loadAll() {
  const [metaResponse, postsResponse] = await Promise.all([
    fetch("/api/meta"),
    fetch("/api/posts")
  ]);
  state.meta = await readJson(metaResponse);
  state.posts = await readJson(postsResponse);
  setOptions("category", state.meta.categories);
  setOptions("narrator", state.meta.narrators);
  setOptions("status", state.meta.statuses);
  renderList();
  setFormData(state.posts[0] || {});
}

form.addEventListener("input", (event) => {
  if (event.target.name === "title" && !form.elements.slug.value) {
    form.elements.slug.value = slugify(event.target.value);
  }

  if (event.target.name === "slug") {
    form.elements.slug.value = slugify(event.target.value);
  }

  if (event.target.name === "coverImage") {
    updateImagePreview();
  }

  updatePreview();
  saveState.textContent = "尚未儲存";
});

bodyEditor.addEventListener("input", () => {
  form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
  updatePreview();
  saveState.textContent = "尚未儲存";
});

document.querySelectorAll(".toolbar [data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    bodyEditor.focus();
    document.execCommand(button.dataset.command, false, button.dataset.value || null);
    form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
    updatePreview();
  });
});

document.querySelector("#insertLinkButton").addEventListener("click", () => {
  const url = prompt("請貼上連結網址");
  if (!url) return;
  bodyEditor.focus();
  document.execCommand("createLink", false, url);
  form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
  updatePreview();
});

document.querySelector("#insertImageButton").addEventListener("click", () => {
  inlineImageInput.click();
});

inlineImageInput.addEventListener("change", () => {
  const file = inlineImageInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    const slug = form.elements.slug.value || slugify(form.elements.title.value);
    const response = await fetch("/api/upload-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: {
          filename: `${slug}-${Date.now()}`,
          dataUrl: reader.result
        }
      })
    });
    const result = await readJson(response);
    if (!result.ok) {
      alert(result.error || "圖片上傳失敗");
      return;
    }

    bodyEditor.focus();
    document.execCommand("insertImage", false, result.imagePath);
    form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
    updatePreview();
    inlineImageInput.value = "";
  };
  reader.readAsDataURL(file);
});

postList.addEventListener("click", (event) => {
  const button = event.target.closest(".post-button");
  if (!button) return;
  const post = state.posts.find((item) => item.id === button.dataset.id);
  if (post) {
    setFormData(post);
    renderList();
  }
});

searchInput.addEventListener("input", renderList);

document.querySelector("#newPostButton").addEventListener("click", () => {
  newPost();
  renderList();
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.imageUpload = {
      filename: file.name,
      dataUrl: reader.result
    };
    const slug = form.elements.slug.value || slugify(form.elements.title.value);
    const extension = file.type.includes("webp")
      ? "webp"
      : file.type.includes("jpeg")
        ? "jpg"
        : "png";
    form.elements.coverImage.value = `/images/contents/${slug || "article-cover"}.${extension}`;
    imagePreview.src = reader.result;
    imagePreview.style.display = "block";
    imageFallback.style.display = "none";
    updatePreview();
  };
  reader.readAsDataURL(file);
});

async function savePost(statusOverride) {
  if (statusOverride) {
    form.elements.status.value = statusOverride;
    updatePreview();
  }

  saveState.textContent = "儲存中...";
  const post = getFormData();
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      originalId: state.currentId,
      post,
      image: state.imageUpload
        ? {
            ...state.imageUpload,
            filename: post.slug || state.imageUpload.filename
          }
        : null
    })
  });
  const result = await readJson(response);
  if (!result.ok) {
    saveState.textContent = "儲存失敗";
    alert(result.error || "儲存失敗");
    return;
  }

  state.imageUpload = null;
  const postsResponse = await fetch("/api/posts");
  state.posts = await readJson(postsResponse);
  setFormData(result.post);
  renderList();
  saveState.textContent =
    result.post.status === "published" ? "已上架" : "已儲存";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await savePost();
});

document.querySelector("#saveDraftButton").addEventListener("click", async () => {
  await savePost("draft");
});

document.querySelector("#publishButton").addEventListener("click", async () => {
  await savePost("published");
});

document.querySelector("#deleteButton").addEventListener("click", async () => {
  const post = getFormData();
  if (!state.currentId || !confirm(`確定刪除「${post.title}」？`)) return;
  await fetch("/api/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: state.currentId })
  });
  const postsResponse = await fetch("/api/posts");
  state.posts = await readJson(postsResponse);
  renderList();
  setFormData(state.posts[0] || {});
});

document.querySelector("#buildButton").addEventListener("click", async () => {
  buildOutput.textContent = "建置中...";
  const response = await fetch("/api/build", { method: "POST" });
  const result = await readJson(response);
  buildOutput.textContent = result.output || result.error || "沒有輸出";
});

document.querySelector("#logoutButton").addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/login";
});

loadAll().catch((error) => {
  buildOutput.textContent = error.message;
});
