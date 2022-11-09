
![resizesnack](https://user-images.githubusercontent.com/80376561/194862640-a22a22dc-94c7-4bf8-849f-7f081b8ba481.png)


# SNACKPEDIA   

과자를 평가하고 리뷰를 남길 수 있는 서비스입니다. 

---
배포 주소 : https://snackpedia.netlify.app/   (서버 중단 상태로 과자 데이터는 보이지 않습니다)
테스트용 아이디 : test001 ~ test020 , 패스워드 : 123123 로 로그인이 가능합니다. 

--- 

Frontend : typescript , react, redux-toolkit, sass

Backend : javascript , express, sequelize, MySQL

formatting : eslint, stylelint, prettier

Production : docker

---
### 과자 데이터 수집

과자 회사 홈페이지의 데이터를 크롤링하여 과자 이름과 과자 사진을 수집했습니다.


```jsx
const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const scraper = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: 1366,
    height: 768,
  })

  await page.goto('http://www.ht.co.kr/product/list?searchProductCode=A00000')

  const snacklist = []
  for (let i = 0; i < 4; i++) {
    const hrefElement = await page.$('.btn_more a')
    await hrefElement.click()

    if (i === 3) {
      const content = await page.content()
      const $ = cheerio.load(content)
      const lists = $('div.prod_wrap div.prod_list').children('dl')
      lists.each((index, list) => {
        const name = $(list).find('dd').first().text()
        const imagesrc = 'http:www.ht.co.kr' + $(list).find('dt img').attr('src')
        const brand = '해태제과'
        const country = 'korea'
        snacklist.push({ name, imagesrc, brand, country })
        console.log(snacklist)
        return snacklist
      })

      console.log(i)
    }
  }

  browser.close()
}

scraper()
```

cheerio를 사용하여 크롤링하던 중 버튼을 클릭해 페이지를 넘겨주어야 하는 부분이 있어 동적 크롤링을 위해 puppeteer를 사용했습니다. 

```jsx
const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const scraper = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: 1366,
    height: 768,
  })

  await page.goto('https://www.crown.co.kr/product/pList.asp')

  const snacklist = []
  for (let i = 0; i < 3; i++) {
    const hrefElement = await page.$('.more a')
    await hrefElement.click()

    if (i === 2) {
      const content = await page.content()
      const $ = cheerio.load(content)
      const lists = $('div.pList div.item').children('a')
      lists.each((index, list) => {
        const name = $(list).find('p.text').text()
        const imagesrc = 'https://www.crown.co.kr' + $(list).find('p.thumb img').attr('src')
        const brand = '크라운'
        const country = 'korea'
        snacklist.push({ name, imagesrc, brand, country })
        return snacklist
      })
    }
  }

  console.log(snacklist)
  browser.close()
}

scraper()
```

수집한 데이터는 서버의 데이터베이스에 저장했습니다.


---

### 사용자 경험 개선


- Skeleton UI, Loading Spiner를 만들어 데이터가 보이기 전 로딩중임을 사용자에게 알려 사용자 경험을 개선했습니다.
![skeleton111](https://user-images.githubusercontent.com/80376561/194859874-50f4423e-cb0c-4597-acdb-543d9d77e80a.gif)
![skeleton2222](https://user-images.githubusercontent.com/80376561/194859885-373b33b5-1b11-4604-b6d3-666c9b8d59e6.gif)

- 크롬의 lighthouse를 사용하여 접근성을 측정해 개선하기 위해 노력했습니다. (button의 aria-label 작성)

---

### 오류 해결

리뷰를 삭제하거나 좋아요를 취소하는 등의 기능을 만들 때, 기존 리뷰나 좋아요 배열에 filter()를 사용해 동작을 구현했는데 적용이 되지 않는 오류가 있었습니다.

![diff1](https://user-images.githubusercontent.com/80376561/197663785-2fabcd47-b119-4dee-83f9-dc1087b84c7e.png)   
redux devtool로 확인한 결과 diff 부분에서 배열의 변화가 없는것을 확인할 수 있습니다.

filter 메서드는 배열을 변화시키지 않기 때문에 redux-toolkit에 내장된 immer 라이브러리에서 변경 사항을 추적하지 못해 오류가 발생했다고 생각했습니다.
따라서 lodash 라이브러리의 remove를 사용하여 배열을 변화시켜주었습니다.


```tsx
//수정 전 코드
.addCase(removeLike.fulfilled, (state, action) => {
        const { reviewList, myReviewList, bestReviewList } = state
        const review = reviewList.find((x) => x.id === action.payload.reviewId)
        const myReview = myReviewList.find((x) => x.id === action.payload.reviewId)
        const bestReview = bestReviewList.find((x) => x.id === action.payload.reviewId)
        if (review) reviewList.filter((x) => x !== action.payload.userId)
        if (myReview) myReviewList.filter((x) => x !== action.payload.userId)
        if (bestReview) bestReviewList.filter((x) => x !== action.payload.userId)
        state.removeLikeLoading = false
        state.removeLikeDone = true
      })
```

```tsx
//수정 후 코드
.addCase(removeLike.fulfilled, (state, action) => {
        const { reviewList, myReviewList, bestReviewList } = state
        const review = reviewList.find((x) => x.id === action.payload.reviewId)
        const myReview = myReviewList.find((x) => x.id === action.payload.reviewId)
        const bestReview = bestReviewList.find((x) => x.id === action.payload.reviewId)
        if (review) _remove(review?.Likers, { id: action.payload.userId })
        if (myReview) _remove(myReview?.Likers, { id: action.payload.userId })
        if (bestReview) _remove(bestReview?.Likers, { id: action.payload.userId })
        state.removeLikeLoading = false
        state.removeLikeDone = true
      })
```

 
![diff2](https://user-images.githubusercontent.com/80376561/197664601-c98f3535-9059-4785-bc9f-dcc28fbf233d.png)   

배열의 변화를 확인할 수 있고 동작하지 않던 오류를 해결했습니다. 
