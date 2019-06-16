<template>
  <div>
    <div>
      <button @click="previousPage">Prev</button>
      <p style="font-weight:bold;font-size:14px;display:inline;">{{page}} of {{numPages}}</p>
      <button @click="nextPage">Next</button>
      <button @click="$refs.pdf.print()">Print</button>
    </div>
    <div>
      <div style="width: 100%;">
        <pdf
          :src="pdfContent"
          :page="page"
          @page-loaded="currentPage = $event"
          @error="error"
          @num-pages="numPages = $event"
          ref="pdf"
        ></pdf>
      </div>
    </div>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  data() {
    return {
      pdfContent: null,
      numPages: 0,
      page: 1,
      loadedRatio: 1
    };
  },
  components: {
    pdf: pdf
  },
  mounted() {
    this.pdfContent =
      "/api/files/Li91cGxvYWRzL01vZHVsZSAyIEludHJvIHRvIFJlbGF0aW9uYWwgTW9kZWwucGRm/t/pdf/m/application/pdf/s/1601407/11e1163cbaebdc5e93b87ed8a0b8e671ba0573db";
  },
  methods: {
    nextPage: function() {
      // Go to next page if any
      if (this.page < this.numPages) this.page++;
    },
    previousPage: function() {
      // Go to previous page if not already at page 1
      if (this.page > 1) this.page--;
    },
    error: function(err) {
      console.log(err);
    }
  }
};
</script>
