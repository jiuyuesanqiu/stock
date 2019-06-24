<template>
	<view class="page">
		<view style="position: fixed;font-size: 28upx;background: #fff;color: #999;width: 100%;">
			<view class="pl-2 pr-2 border-bottom1" style="height: 72upx;line-height: 72upx;">
				<view class="pl-5" style="width: 33.33%;display: inline-block;">股票名称</view>
				<view class="pr-1" style="width: 33.33%;display: inline-block;text-align: right;">当前价格</view>
				<view class="pl-3" style="width: 33.33%;display: inline-block;text-align: center;">高/低估</view>
			</view>
			<view class="whCenter border-bottom1" style="color: #999999;">
				<text class="whCenter" style="height: 60upx;font-size: 26upx;">数据更新于<text>2019年6月24日</text></text>
			</view>
		</view>

		<view class="" style="padding-top: 132upx;">
			<view class="whCenter ml-2 pr-2 border-bottom1" v-for="(item,index) in quoteList" :key="index" style="background: #fff;color: #333333;font-weight: bold;">
				<view class="wCenter hFlex pl-5" style="flex: 1;font-size: 30upx;align-items: flex-start;height: 100upx;line-height: 40upx;">
					<view class="hCenter" style="font-size: 34upx;color: #333333;">{{item.name}}</view>
					<view class="hCenter" style="font-size: 24upx;color: #a3a3a3;">{{item.symbol}}</view>
				</view>
				<view v-if="item.peg<1" class="hCenter pr-5" style="flex: 1;color: #E93030;font-size: 36upx;justify-content: flex-end;">{{item.current}}</view>
				<view v-else class="hCenter pr-5" style="flex: 1;color: #009900;font-size: 36upx;justify-content: flex-end;">{{item.current}}</view>
				<view class="whCenter" style="flex: 1;font-size: 36upx;">
					<view>{{item.assessment}}({{item.peg}})</view>
				</view>
			</view>
		</view>

		<view class="whCenter hFlex pt-5 pb-1" style="color: #ADAEAA;line-height: 44upx;background-color: #F8F8F8;font-size: 24upx;">
			<p>— 数据由A股估值分析团队整理提供 —</p>
			<p>估值数据仅供参考，不构成任何投资建议，投资需谨慎。</p>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				titles: ['股票代码', '股票名称', '当前价格', 'PEG', '是否低估'],
				quoteList:[],
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			async getData() {
				let quoteList = await this.$api.quoteList();
				let list = quoteList.list;
				for (let i = 0; i < list.length; i++) {
					let symbol = list[i].symbol;
					let quote = await this.$api.quote(symbol);
					let income = await this.$api.income(symbol);
					//计算近4个季度扣除非经常性损益后的净利润和
					let pro_new = 0;
					let pro_old = 0;
					for (let j = 0; j < income.list.length; j++) {
						if(j>3){
							pro_old += income.list[j].net_profit_after_nrgal_atsolc[0];
						}else{
							pro_new += income.list[j].net_profit_after_nrgal_atsolc[0];
						}
					}
					//计算PE(avg)
					let pe_avg = (quote.quote.pe_forecast+quote.quote.pe_lyr+quote.quote.pe_ttm)/3;
					//计算i(pro)
					let i_pro = (pro_new-pro_old)/Math.abs(pro_old);
					//计算PEG
					let peg = 0;
					if(i_pro>0){
						peg = pe_avg/(i_pro*100)
					}else{
						peg = pe_avg/(1-i_pro)
					}
					if(peg>1){
						list[i].assessment='高估';
					}else if(peg==1){
						list[i].assessment='合理';
					}else {
						list[i].assessment='低估';
					}
					list[i].peg = peg.toFixed(2);
				}
				this.quoteList = list;
			}
		}
	}
</script>

<style>
	.page {
		background-color: #FFF;
	}

	.border-bottom1 {
		border-bottom: 1upx solid #F3F3F3;
	}
</style>
