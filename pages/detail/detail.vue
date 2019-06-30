<template>
	<view>
		<view class="flex text-center py-2 bb">
			<view style="width: 25%;">
				股票名称
			</view>
			<view style="width: 25%;">
				当前价格
			</view>
			<view style="width: 25%;">
				PEG
			</view>
			<view style="width: 25%;">
				估值
			</view>
		</view>
		<view class="flex text-center py-2 bb">
			<view style="width: 25%;">
				<view>
					{{stockData.name}}
				</view>
				<view class="text-gray">
					{{stockData.symbol}}
				</view>
			</view>
			<view style="width: 25%;" class="d-flex justify-center align-items-center">
				{{stockData.current}}
			</view>
			<view style="width: 25%;" class="d-flex justify-center align-items-center">
				{{stockData.peg}}
			</view>
			<view style="width: 25%;" class="d-flex justify-center align-items-center" :style="{color:stockData.peg<1?'green':'red'}">
				{{stockData.assessment}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stockData: {
					name:'',
					symbol:'',
					current:'',
					peg:'',
					assessment:'',
				}
			}
		},
		onLoad(option) {
			this.computed(option.symbol);
		},
		methods: {
			async computed(symbol) {
				let [quote, income] = await Promise.all([this.$api.quote(symbol), this.$api.income(symbol)])
				let stockData = {};
				//计算近4个季度扣除非经常性损益后的净利润和
				let pro_new = 0;
				let pro_old = 0;
				for (let j = 0; j < income.list.length; j++) {
					if (j > 3) {
						pro_old += income.list[j].net_profit_after_nrgal_atsolc[0];
					} else {
						pro_new += income.list[j].net_profit_after_nrgal_atsolc[0];
					}
				}
				let pe_forecast = quote.quote.pe_forecast;
				let pe_lyr = quote.quote.pe_lyr;
				let pe_ttm = quote.quote.pe_ttm;
				if (pe_forecast < 0) {
					pe_forecast = 1000;
				} else if (pe_forecast > 500) {
					pe_forecast = 500;
				}

				if (pe_lyr < 0) {
					pe_lyr = 1000;
				} else if (pe_lyr > 500) {
					pe_lyr = 500;
				}
				if (pe_ttm < 0) {
					pe_ttm = 1000;
				} else if (pe_ttm > 500) {
					pe_ttm = 500;
				}

				//计算PE(avg)
				let pe_avg = (pe_forecast + pe_lyr + pe_ttm) / 3;
				//计算i(pro)
				let i_pro = (pro_new - pro_old) / Math.abs(pro_old);
				//计算PEG
				let peg = 0;
				if (i_pro > 0) {
					peg = pe_avg / (i_pro * 100)
				} else {
					peg = pe_avg / (1 - i_pro)
				}
				if (peg > 1) {
					stockData.assessment = '高估';
				} else if (peg == 1) {
					stockData.assessment = '合理';
				} else {
					stockData.assessment = '低估';
				}
				stockData.current = quote.quote.current;
				stockData.symbol = quote.quote.symbol;
				stockData.peg = peg.toFixed(2);
				stockData.name = income.quote_name;
				this.stockData = stockData;
			}
		}
	}
</script>

<style>

</style>
