// Vietnamese content — IntroPage (answers also in Vietnamese)
export default {
  badge: 'Tự giới thiệu',
  title: 'Script tự giới thiệu',
  subtitle: '3 phiên bản: HR (~50s) · Chi tiết kỹ thuật · Sếp Nhật (~45s)',
  content: `# Tự giới thiệu — Daifuku Intralogistics Vietnam

> **Lưu ý chính xác** — mọi nội dung dưới đây tuân theo những ranh giới sau:
> 1. Ở XPERC, yêu cầu đến dưới dạng FRD do BA viết. Minh implement theo FRD; không phân tích yêu cầu với khách hàng, không viết design document.
> 2. Cải thiện ~40% / ~30% đến từ **sửa CODE** — giảm query, giảm join. KHÔNG phải từ Redis caching.
> 3. Redis được cấu hình để 2 pod dùng chung state, chạy mượt khi scale. Đó là việc deployment, câu chuyện riêng với phần tối ưu.

---

## Version A — Vòng HR, ~50 giây

Giữ cho tự nhiên. HR không chấm code ở đây — họ muốn biết bạn là ai và bạn có ở lại lâu không.

> Xin chào, tên tôi là Minh. Tôi là backend developer.
>
> Trong một năm qua, tôi làm việc tại XPERC, xây dựng các tính năng bằng Java và Spring Boot cho một nền tảng quản lý doanh nghiệp dành cho khách hàng B2B.
>
> Điều tôi thích nhất là học những thứ mình chưa từng dùng. Trong một dự án, chúng tôi cần xây dựng phần client, vì vậy tôi tự học Angular và hoàn thành nó. Tôi cũng dùng công cụ AI rất nhiều trong công việc hàng ngày — tôi cấu hình chúng để tự động hóa những phần lặp đi lặp lại, để tôi có thể tập trung vào những phần thực sự cần suy nghĩ.
>
> Tôi ứng tuyển vị trí này vì muốn làm việc gần hơn với hệ thống thực tế và khách hàng, không chỉ ngồi trong văn phòng. Tôi cũng đang học tiếng Nhật.
>
> Tôi có thể bắt đầu ngay. Cảm ơn.

**Bốn nhịp dễ nhớ:** tôi là ai → thích học cái mới → dùng AI tự động hoá → vì sao chỗ này → đi làm được ngay.

Phần chi tiết kỹ thuật (FRD, tối ưu query, 40%/30%) **chỉ bung ra khi Department hỏi tới**.

---

## Nếu Department hỏi "what exactly did you do at XPERC?"

Chỉ khi đó mới đi vào chi tiết. Giữ trong 40 giây.

> Tôi làm việc dựa trên các tài liệu yêu cầu chức năng (FRD) do BA viết. Tôi đọc FRD, hỏi khi có điểm chưa rõ, rồi xây dựng các chức năng bằng Java và Spring Boot — API, xử lý database, các background job. Tôi viết test, sửa lỗi được phản hồi lại, và hỗ trợ các module sau khi ra mắt.
>
> Điều tôi tự hào nhất: một module chạy rất chậm khi tải cao. Tôi đi vào code, giảm số lượng query và loại bỏ các join không cần thiết. Số query giảm khoảng 40%, thời gian phản hồi giảm khoảng 30%. Tôi đã sửa nguyên nhân thay vì che đậy nó bằng cache.

---

## Version B — Vòng 2 (Sếp tổng Nhật), ~45 giây

Nói **chậm hơn và đơn giản hơn**. Sếp Nhật thường cũng dùng tiếng Anh như ngôn ngữ thứ hai.

*(Mở đầu tuỳ chọn bằng tiếng Nhật — cúi nhẹ đầu)*

**はじめまして。ヴー・ホアン・ミンと申します。よろしくお願いいたします。**

*Hajimemashite. Vu Hoang Minh to moushimasu. Yoroshiku onegai itashimasu.*

> Xin chào buổi chiều. Tên tôi là Minh. Cảm ơn bạn đã dành thời gian.
>
> Tôi tốt nghiệp ngành Kỹ thuật phần mềm tại Đại học FPT. Trong một năm, tôi làm backend developer tại XPERC. Tôi dùng Java và Spring Boot. Tôi nhận tài liệu yêu cầu từ BA và xây dựng các chức năng từ đó. Tôi viết test. Sau khi release, tôi sửa lỗi và bàn giao phiên bản tiếp theo.
>
> Tôi muốn gia nhập Daifuku vì muốn làm việc gần với hệ thống thực tế và khách hàng thực, không chỉ trong văn phòng. Tôi đang học tiếng Nhật và hy vọng được làm việc với đội ngũ bên Nhật.
>
> Cảm ơn rất nhiều.

---

## Vì sao "I work from an FRD" là câu trả lời tốt, không phải câu yếu

Đừng xin lỗi về điều này. Nói thẳng. Nó cho họ thấy ba điều họ muốn:

- Bạn đọc spec và build đúng theo — Daifuku bán hệ thống mà spec là hợp đồng với khách.
- Bạn hỏi khi FRD không rõ thay vì đoán mò.
- Bạn muốn phát triển sang phần thiết kế — đúng điều JD này offer ("create software design documents").

> "Have you written design documents?" → **"Chưa. Nhưng tôi đã làm việc từ những tài liệu đó suốt một năm, vì vậy tôi hiểu một tài liệu tốt cần có gì. Đó là phần tôi muốn phát triển trong vai trò này."**

---

## Lưu ý khi trình bày

- **Nhịp độ:** chậm hơn cảm giác tự nhiên. Khoảng 2 từ/giây. Dừng ở mỗi dấu chấm.
- **Số:** "about forty percent", "about thirty percent".
- **Daifuku:** DAI-fu-ku. Nói tên công ty một lần, tự tin.
- **Nếu quên từ:** "Sorry, let me say that again" rồi restart câu. Đừng đứng im.
- **Đừng học thuộc từng chữ.** Học 5 nhịp: học vấn → XPERC → 2 kết quả → vì sao Daifuku → đi làm được ngay.
- **FRD** — lần đầu nói đủ: "functional requirement document". Sau đó mới dùng "FRD".

---

## Follow-up sẽ xuất hiện sau intro này

| Họ hỏi | Chuẩn bị gì |
|---|---|
| "Tell me more about the performance fix." | Sửa code: giảm query, bỏ join thừa. ~40% query, ~30% response. Nói rõ: fix code chứ không dùng cache. |
| "You mentioned Redis — what did you use it for?" | Trung thực: Redis cấu hình để 2 pod dùng chung state khi scale. Không phải caching layer. |
| "Have you designed a database schema yourself?" | FRD và design do BA; bạn implement entities và queries. Ví dụ tự thiết kế: đồ án Car Management. |
| "Have you written design documents?" | Chưa, muốn học phần này. |
| "Do you have Oracle or SQL Server?" | PostgreSQL professionally, MySQL at university. Không bluff. |
| "Do you know warehouse systems / WCS?" | Chưa. Rồi bắc cầu: integration, message queue, timeout/retry — cùng dạng vấn đề. |
| "Are you willing to travel to customer sites?" | Có, dứt khoát, không kèm điều kiện. |
| "How is your Japanese?" | Cơ bản, đang học. Trả lời đúng mức thật. |
| "Your salary expectation?" | ~20M gross cho 1 năm kinh nghiệm. Open to discuss. |
| "Why did you leave XPERC?" | Ngắn, trung tính, không chê. |

---

## Câu bạn hỏi lại họ

Hỏi 2–3 câu. Được tính điểm.

- WCS ở đây kết nối với gì — tích hợp với WMS của khách hàng hay trực tiếp với ERP?
- Giao tiếp với thiết bị dùng giao thức chuẩn hay đặc thù theo từng dự án?
- Với người mới vào, năm đầu tiên thường như thế nào — triển khai trước, sau đó mới đến tài liệu thiết kế?
`
}
