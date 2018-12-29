<template>
	<div>
		<pdf
			v-for="i in numPages"
			:key="i"
			:src="src"
			:page="i"
		></pdf>
	</div>
</template>

<script>

import pdf from 'vue-pdf'

export default {
	components: {
		pdf
	},
	data() {
		return {
			numPages: undefined,
		}
    },
    computed: {
        src: function (){
            return pdf.createLoadingTask('/api/files/Li91cGxvYWRzL01vZHVsZSAyIEludHJvIHRvIFJlbGF0aW9uYWwgTW9kZWwucGRm/t/pdf/m/application/pdf/s/1601407/11e1163cbaebdc5e93b87ed8a0b8e671ba0573db');
        }
    },
	mounted() {
		this.src.then(pdf => {

            console.log('loaeded');
			this.numPages = pdf.numPages;
		});
	}
}

</script>
