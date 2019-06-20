<template>
	<view class="page">
		<view style="position: fixed;font-size: 28upx;background: #fff;color: #999;width: 100%;">
			<view class="pl-2 pr-2 border-bottom1" style="height: 72upx;line-height: 72upx;">
				<view class="pl-5" style="width: 33.33%;display: inline-block;">股票名称</view>
				<view class="pr-1" style="width: 33.33%;display: inline-block;text-align: right;">当前价格</view>
				<view class="pl-3" style="width: 33.33%;display: inline-block;text-align: center;">高/低估</view>
			</view>
			<view class="whCenter border-bottom1" style="color: #999999;">
				<text class="whCenter" style="height: 60upx;font-size: 26upx;">数据更新于<text>06-20 22:26</text></text>
			</view>
		</view>

		<view class="" style="padding-top: 132upx;">
			<view class="whCenter ml-2 pr-2 border-bottom1" v-for="(item,index) in tableList" :key="index" style="background: #fff;color: #333333;font-weight: bold;">
				<view class="wCenter hFlex pl-5" style="flex: 1;font-size: 30upx;align-items: flex-start;height: 100upx;line-height: 40upx;">
					<view class="hCenter" style="font-size: 34upx;color: #333333;">{{item.name}}</view>
					<view class="hCenter" style="font-size: 24upx;color: #a3a3a3;">{{item.number}}</view>
				</view>
				<view v-if="item.peg<1" class="hCenter pr-5" style="flex: 1;color: #E93030;font-size: 36upx;justify-content: flex-end;">{{item.currentPrice}}</view>
				<view v-else class="hCenter pr-5" style="flex: 1;color: #009900;font-size: 36upx;justify-content: flex-end;">{{item.currentPrice}}</view>
				<view class="whCenter" style="flex: 1;font-size: 36upx;">
					<view v-if="item.peg<1" style="color:#E93030">低估</view>
					<view v-else-if="item.peg==1">合理</view>
					<view v-else style="color: #009900;">高估</view>
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
				titles:['股票代码','股票名称','当前价格','PEG','是否低估'],
				tableList:[{
					number: '601099.SH',
					name:'太平洋',
					currentPrice:3.46,
					peg:0.0022,
					isLow:'是'
				},{
					number:'600519.SH',
					name:'贵州茅台',
					currentPrice:913.00,
					peg:0.9116,
					isLow:'是'
				},{
					number:'300775.SZ',
					name:'三角防务',
					currentPrice:32.76,
					peg:0,
					isLow:'是'
				},{
					number:'600518.SH',
					name:'ST康美',
					currentPrice:3.05,
					peg:-0.8077,
					isLow:'是'
				},{
					number:'000651.SZ',
					name:'格力电器',
					currentPrice:51.16,
					peg:0.7387,
					isLow:'是'
				},{
					number:'000063.SZ',
					name:'中兴通讯',
					currentPrice:30.28,
					peg:0.6642,
					isLow:'是'
				},{
					number:'002049.SZ',
					name:'紫光国微',
					currentPrice:42.00,
					peg:2.9038,
					isLow:'是'
				},{
					number:'000725.SZ',
					name:'京东方A',
					currentPrice:3.39,
					peg:-1.1392,
					isLow:'是'
				},{
					number:'002842.SZ',
					name:'翔鹭钨业',
					currentPrice:17.79,
					peg:0.8117,
					isLow:'是'
				},{
					number:'002115.SZ',
					name:'三维通信',
					currentPrice:12.47,
					peg:0.0810,
					isLow:'是'
				}],
			}
		},
		onLoad(){
			
		}
	}
</script>

<style>
	.page{
		background-color: #FFF;
	}
	.border-bottom1{
		border-bottom: 1upx solid #F3F3F3;
	}
		
</style>
