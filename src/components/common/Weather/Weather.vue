<template>
	<div id="he-plugin-standard"></div>
	
</template>



<script>
export default {
	name: "Weather",
	mounted() {
		window.WIDGET = {
			CONFIG: {
				layout: "1",
				width: "350",
				height: "150",
				background: "1",
				dataColor: "FFFFFF",
				borderRadius: "10",
				key: "5b062d9a19db4943ae8f0aee42ff3647",
			}
		};
		  let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src="https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
      document.getElementsByTagName('head')[0].appendChild(script);

	},
	
};
</script>

<style lang="less" scoped>

</style>
