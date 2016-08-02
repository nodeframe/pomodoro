module SegmentTree {
	class Phase {
		start:number
		end:number
		val:number
		constructor(start:number,end:number,val:number) {
			this.start = start
			this.end = end
			this.val = val
		}
		public increase(num:number = 1):void {this.val += num}
		public cut(start:number,end:number) {return new Phase(start,end,this.val)}
	}
	class TreeNode {
		public data:Phase
		public left:TreeNode
		public right:TreeNode

		constructor(data:Phase,left:TreeNode = null,right:TreeNode = null) {
			this.data = data
			this.left = left
			this.right = right
		}
		public isLeaf():boolean {
			return this.left == null && this.right == null
		}
		public increase(start:number,end:number,num:number = 1):void {
			start = Math.max(start,this.data.start)
			end = Math.min(end,this.data.end)
			if(start >= end)	return
			if(this.data.start == start && this.data.end == end)
				this.data.val += num
			else if(this.data.start == start) {
				this.split(end)
				this.left.increase(start,end,num)
			}
			else {
				this.split(start)
				this.left.increase(start,end,num)
				this.right.increase(start,end,num)
			}
		}
		public split(mid:number):void {
			if(this.data.start == mid || this.data.end == mid)	return
			if(this.isLeaf()) {
				this.left = new TreeNode(this.data.cut(this.data.start,mid))
				this.right = new TreeNode(this.data.cut(mid,this.data.end))
			}
			else if(this.left.data.end > mid)	this.left.split(mid)
			else if(this.right.data.start < mid)	this.right.split(mid)
		}
	}

	class Tree {
		private root:TreeNode
		private list:Phase[]
		private numLeaf:number
		private maxDepth:number

		constructor (root:TreeNode = null) {
			this.root = new TreeNode(new Phase(0,1440,0))
			this.numLeaf = 0
			this.maxDepth = 0
		}
		private traverse(node:TreeNode = this.root,depth:number = 0):void {
			if(node.isLeaf()) {
				if(this.list.length > 0 && this.list[this.list.length - 1].val == node.data.val)
					this.list[this.list.length - 1].end = node.data.end
				else
					this.list.push(node.data)
				this.numLeaf++
				this.maxDepth = Math.max(this.maxDepth,depth)
			}
			else {
				this.traverse(node.left,depth + 1)
				this.traverse(node.right,depth + 1)
			}
		}
		public toArray():Phase[] {
			this.list = []
			this.traverse(this.root)
			console.log(this.numLeaf + " " + this.maxDepth)
			return this.list
		}
		public increase(start:number,end:number,num:number = 1) {this.root.increase(start,end,num)}
	}
	interface Pair {
		x:number
		y:number
	}
	export function compute(list:Array<Pair>) {
		list.sort((a:Pair,b:Pair) => a.x - b.x)
		var tree:Tree = new Tree()
		for(var each of list)	tree.increase(each.x,each.y)
		return tree.toArray()
	}
}
export default SegmentTree