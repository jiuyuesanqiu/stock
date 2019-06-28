<template>
	<view>
		设：平均市盈率为 PE（avg）， 
		若，市盈率为“亏损”，
		则取值=“1000”； 
		若，市盈率＞500，
		则取值=“500” 
		PE(avg)= 市盈率（静）
		市盈率（动）
		市盈率（TTM） 
		3 、同设：近期四个季度扣非净利润和为
		Pro（new）, 上同期四个季度扣非净利润和为 Pro（old）； 利润成长率为 i（Pro）， i(pro)= Pro（new） Pro（old） Pro（old） (1)若 i(pro)为正数， PE(avg) PEG= i(
		pro)100 (2) 若 i(pro)≦0， PE(avg) PEG=1- i( pro) 当：0﹤PEG﹤1，股票价值被低估 PEG=1， 股票价值合理 PEG﹥1， 股票价格被高估
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
