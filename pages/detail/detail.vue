<template>
	<view>
		<view class="d-flex justify-around">
			<view>
				股票代码
			</view>
			<view>
				股票价格
			</view>
			<view>
				估值
			</view>
			<view>
				PEG
			</view>
		</view>
		<view class="d-flex justify-around">
			<view>
				{{stockData.symbol}}
			</view>
			<view>
				{{stockData.current}}
			</view>
			<view>
				{{stockData.assessment}}
			</view>
			<view>
				{{stockData.peg}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stockData:{}
			}
		},
		onLoad(option) {
			this.computed(option.symbol);
		},
		methods: {
			async computed(symbol) {
				let [quote,income] = await Promise.all([this.$api.quote(symbol),this.$api.income(symbol)])
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
				//计算PE(avg)
				let pe_avg = (quote.quote.pe_forecast + quote.quote.pe_lyr + quote.quote.pe_ttm) / 3;
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
				this.stockData = stockData;
			}
		}
	}
</script>

<style>

</style>
