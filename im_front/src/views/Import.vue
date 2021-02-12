<template>
  <div>
    <div class="container  mx-auto justify-center flex w-100" v-if="!loading">
      <div
        class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-60 w-1/2"
      >
        <div>
          <h3 class="text-grey-darker text-2xl  my-5 font-semibold">
            匯入用戶資料
          </h3>
        </div>
        <div>
          <span class="text-red-600">{{ message }}</span>
        </div>
        <div class="mb-6 ">
          <div class="flex w-full  items-center justify-center bg-grey-lighter">
            <label
              class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer "
            >
              <svg
                class="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                />
              </svg>
              <span class="mt-2 text-base leading-normal">選擇檔案</span>
              <input
                type="file"
                ref="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                class="hidden"
                v-on:change="handleFilesUpload()"
              />
            </label>
          </div>
        </div>
        <div>{{ this.file.name }}</div>
        <div class="flex justify-center ">
          <button
            class="bg-blue hover:bg-blue-dark text-blue-500 font-bold py-2 px-4 rounded"
            type="button"
            @click="submit"
          >
            上傳
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      載入中
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: "",
      loading: false,
      repeat: [],
    }
  },
  methods: {
    handleFilesUpload() {
      this.file = this.$refs.file.files[0]
    },
    async submit() {
      let formData = new FormData()
      formData.append("file", this.file)
      await this.$http.post("users/upload/upload", formData)
    },
  },
}
</script>
<style></style>
