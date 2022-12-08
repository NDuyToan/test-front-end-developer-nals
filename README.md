## Available Scripts

To install the required libraries, you run:

### `yarn`

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

===============Requirements of project===========

1. Having a good project structure.
   => OK

2. Applying linters (such as eslint, tslint, prettier).
   => OK

3. Having a nice code format and a good naming convention.
   => OK

4. Using component design.
   => OK

5. Using stage management libraries (such as Redux, Redux-saga, Vuex).
   => OK, use Redux-toolkit, Redux-thunk

6. Having a high quality of UI/UX, responsiveness and performance.
   => OK, interface has been responsive on different devices, like laptop, tablet, phone.

7. Nice to have some loading UI (such as loading spinner or loading skeleton).
   => OK, In Home page, I use loading spinner. In Create page, Edit page I use loading skeleton.

8. Nice to do it in typescript and has type declaration.
   => OK

9. Nice to have unit tests.
   => Not

10. Nice to have code lazy loading.
    => OK. I use lazy load component

11. Nice to have code deployed to any host (such as Heroku)
    => Not.

==================== Một số ghi chú khác==============

- Vì API không trả về tổng số lượng blog, nên đang để mặc định tổng blog là 50. Vì thế nếu click vào các page 4,5 có thể không có dữ liệu.
- Khi tạo mới 1 blog, ở phần upload ảnh, đã gửi file ảnh lên, nhưng trên BE lại lưu toàn bộ thông tin file ảnh, nên khi gọi API để lấy thông tin blog, thì trường image bị sai, ảnh không hiển thị được, vì thế em cũng không làm upload ảnh khi edit.
