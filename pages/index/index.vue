<template>
	<view>
		
		<view class="whCenter pl-2 pr-2" style="font-size: 30upx;background: #fff;font-weight: bold;">
			<!-- <view class="hCenter pt-3 pb-3" style="border: 1px solid #007BFF;flex: 1;" v-for="(item,index) in titles" :key="index">{{item}}</view> -->
			<view class="hCenter pt-3 pb-3" style="flex: 2;">
				股票代码
			</view>
			<view class="hCenter pt-3 pb-3" style="flex: 2;">
				股票名称
			</view>
			<view class="hCenter pt-3 pb-3" style="flex: 1.5;">
				当前价格
			</view>
			<view class="whCenter pt-3 pb-3" style="flex: 2;">
				PEG
			</view>
			<view class="hCenter pt-3 pb-3" style="flex: 1.5;">
				是否低估
			</view>
		</view>
		
		<view class="whCenter pl-2 pr-2 pb-3" v-for="(item,index) in tableList" :key="index" style="background: #fff;color: #333333;">
			<view class="hCenter pt-1 pb-1 border-bottom1" style="flex: 2;">{{item.number}}</view>
			<view class="hCenter pt-1 pb-1  border-bottom1" style="flex: 2;">{{item.name}}</view>
			<view class="whCenter pt-1 pb-1  border-bottom1" style="flex: 1.5;color: #444;font-size: 30upx;">{{item.currentPrice}}</view>
			<view class="whCenter pt-1 pb-1  border-bottom1" style="flex: 2;">{{item.peg}}</view>
			<!-- <view class="whCenter pt-1 pb-1  border-bottom" style="flex: 1.5;">{{item.isLow}}</view> -->
			<view class="whCenter pt-1 pb-1  border-bottom1" style="flex: 1.5;font-size: 30upx;">
				<view v-if="item.peg<1" style="color:red">是</view>
				<view v-else-if="item.peg==1">合理</view>
				<view v-else>否</view>
			</view>
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
	.border-bottom1{
		border-bottom: 1upx solid #F3F3F3;
	}
		
</style>
