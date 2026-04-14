// ===== Role Tabs (Tourist / Guide) =====
const touristTab = document.getElementById("touristTab");
const guideTab = document.getElementById("guideTab");
const touristArea = document.getElementById("touristArea");
const guideArea = document.getElementById("guideArea");

touristTab.addEventListener("click", () => {
  touristTab.classList.add("active");
  guideTab.classList.remove("active");
  touristArea.classList.add("active");
  guideArea.classList.remove("active");
});

guideTab.addEventListener("click", () => {
  guideTab.classList.add("active");
  touristTab.classList.remove("active");
  guideArea.classList.add("active");
  touristArea.classList.remove("active");
});

// ===== Tourist Tabs (Sign In / Create Account) =====
const signInTab = document.getElementById("signInTab");
const createTab = document.getElementById("createTab");
const signInForm = document.getElementById("signInForm");
const createForm = document.getElementById("createForm");

signInTab.addEventListener("click", () => {
  signInTab.classList.add("active");
  createTab.classList.remove("active");
  signInForm.classList.add("active");
  createForm.classList.remove("active");
});

createTab.addEventListener("click", () => {
  createTab.classList.add("active");
  signInTab.classList.remove("active");
  createForm.classList.add("active");
  signInForm.classList.remove("active");
});

// ===== Guide Tabs (Sign In / Apply) =====
const guideSignInTab = document.getElementById("guideSignInTab");
const applyGuideTab = document.getElementById("applyGuideTab");
const guideSignInForm = document.getElementById("guideSignInForm");
const applyGuideForm = document.getElementById("applyGuideForm");

guideSignInTab.addEventListener("click", () => {
  guideSignInTab.classList.add("active");
  applyGuideTab.classList.remove("active");
  guideSignInForm.classList.add("active");
  applyGuideForm.classList.remove("active");
});

applyGuideTab.addEventListener("click", () => {
  applyGuideTab.classList.add("active");
  guideSignInTab.classList.remove("active");
  applyGuideForm.classList.add("active");
  guideSignInForm.classList.remove("active");
});
