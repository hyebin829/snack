
![resizesnack](https://user-images.githubusercontent.com/80376561/194862640-a22a22dc-94c7-4bf8-849f-7f081b8ba481.png)


# SNACKPEDIA   

과자를 평가하고 리뷰를 남길 수 있는 서비스입니다. 

---
배포 주소 : https://snackpedia.netlify.app/   
테스트용 아이디 : test001 ~ test020 , 패스워드 : 123123 로 로그인이 가능합니다. 

--- 

Frontend : typescript , react, redux-toolkit, sass

Backend : javascript , express, sequelize, MySQL

formatting : eslint, stylelint, prettier

Production : docker

---

<details>
<summary> 과자 데이터 수집</summary>

과자 회사 홈페이지의 데이터를 크롤링하여 과자 이름과 과자 사진을 수집했습니다.

<div>

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
</div>
</details>



<details>
<summary>사용자 경험 개선</summary>

<div>

- Skeleton UI, Loading Spiner를 만들어 데이터가 보이기 전 로딩중임을 사용자에게 알려 사용자 경험을 개선했습니다.
![skeleton111](https://user-images.githubusercontent.com/80376561/194859874-50f4423e-cb0c-4597-acdb-543d9d77e80a.gif)
![skeleton2222](https://user-images.githubusercontent.com/80376561/194859885-373b33b5-1b11-4604-b6d3-666c9b8d59e6.gif)

- 크롬의 lighthouse를 사용하여 접근성을 측정해 개선하기 위해 노력했습니다. (button의 aria-label 작성)

</div>
</details>
