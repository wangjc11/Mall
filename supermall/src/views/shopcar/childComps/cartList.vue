<template>
<div>
  <cart-list-item v-for="(item, index) in $store.state.cartList" :key="index" :product='item'/>
  <ul>
    <li>denx1</li>
    <li>denx2</li>
    <li>denx3</li>
    <li>denx4</li>
    <li>denx5</li>
    <li>denx6</li>
    <li>denx7</li>
    <li>denx8</li>
    <li>denx9</li>
    <li>denx10</li>
    <li>denx11</li>
    <li>denx12</li>
    <li>denx13</li>
    <li>denx14</li>
    <li>denx15</li>
    <li>denx16</li>
    <li>denx17</li>
    <li>denx18</li>
    <li>denx19</li>
    <li>denx20</li>
    <li>denx21</li>
    <li>denx22</li>
    <li>denx23</li>
    <li>denx24</li>
    <li>denx25</li>
    <li>denx26</li>
    <li>denx27</li>
    <li>denx28</li>
    <li>denx29</li>
    <li>denx30</li>
    <li>denx31</li>
    <li>denx32</li>
    <li>denx33</li>
    <li>denx34</li>
    <li>denx35</li>
    <li>denx36</li>
    <li>denx37</li>
    <li>denx38</li>
    <li>denx39</li>
    <li>denx40</li>
    <li>denx41</li>
    <li>denx42</li>
    <li>denx43</li>
    <li>denx44</li>
    <li>denx45</li>
    <li>denx46</li>
    <li>denx47</li>
    <li>denx48</li>
    <li>denx49</li>
    <li>denx50</li>
  </ul>
</div>
</template>

<script>
import cartListItem from "./cartListItem.vue"

export default {
  name: 'cartList',
  components: {
    cartListItem,
  }
}
</script>

<style>

</style>
