# picky-client

[English](../../README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · **Tiếng Việt** · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Français](README_fr.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md) · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · [Italiano](README_it.md) · [Ελληνικά](README_el.md)

**Để tác nhân của bạn thiết kế. Hãy là khách hàng khó tính. Đẩy chất lượng thiết kế dịch vụ của bạn đến giới hạn.**

So sánh các bản thiết kế UI/UX thực tế và chọn hướng bạn muốn. Khi bạn chốt thiết kế, tác nhân sẽ áp dụng vào màn hình thật và kiểm tra kết quả.

## Bắt đầu với tác nhân của bạn

Sao chép yêu cầu này vào tác nhân lập trình của bạn:

```text
Đọc README tại https://github.com/daviddev90/picky-client.git và cài đặt picky-client trong môi trường tác nhân của bạn.
```

Sau đó, trong dự án sản phẩm của bạn, yêu cầu vòng đầu tiên:

```text
Dùng picky-client để tạo 3–5 phương án bố cục cho bảng điều khiển này. Giữ nguyên màu sắc, phông chữ và tính năng hiện có, rồi cho tôi so sánh các phương án trong trình duyệt trước khi chọn.
```

Tác nhân nghiên cứu các ví dụ, tạo phương án, kiểm tra cách hiển thị trong trình duyệt thật và chia sẻ URL đánh giá mà bạn truy cập được. Bạn xem các phương án và đưa ra lựa chọn.

## Một vòng diễn ra như thế nào

1. Bạn xác định màn hình và quyết định thiết kế cần đưa ra.
2. Tác nhân nghiên cứu các ví dụ, tạo phương án và kiểm tra trong trình duyệt thực tế.
3. Bạn so sánh các phương án và chọn một phương án.
4. Bạn duyệt vòng tiếp theo hoặc chốt thiết kế và yêu cầu tác nhân áp dụng vào màn hình thực tế.

Mỗi vòng quyết định một khía cạnh thiết kế còn bỏ ngỏ. Những lựa chọn của bạn được giữ lại, nên vòng tiếp theo phát triển từ những gì bạn đã thích.

| Quyết định của bạn | Những gì bạn so sánh |
|---|---|
| Sắc thái, cá tính thị giác hoặc các cách bố trí dễ sử dụng tương đương nhau | Mười hướng khác biệt |
| Bố cục, thành phần điều khiển, mật độ hoặc điều hướng | Ba đến năm phương án có cơ sở, kèm những đánh đổi về tính dễ sử dụng |
| Chỉ còn một phương án có ý nghĩa | Một đề xuất có lý giải |
| Chủ đề thiết kế đã được chốt | Các phương án giữ nguyên màu sắc, bản sắc phông chữ và chất liệu |

## Chọn, tinh chỉnh, áp dụng

Cho tác nhân biết bạn đã chọn gì và cần làm gì tiếp theo. Ví dụ:

```text
Tôi chọn #2. Tiếp theo, đề xuất một vòng về kiểu chữ trong khi giữ nguyên bố cục này.
```

```text
Thiết kế đã được chốt. Áp dụng #2 vào màn hình thật và kiểm tra hành vi cùng các trạng thái của màn hình.
```

Tác nhân chờ quyết định của bạn trước khi tiếp tục. Việc áp dụng thiết kế bao gồm giữ nguyên chức năng hiện có, điều chỉnh bố cục đã chọn cho phù hợp với màn hình thật và kiểm tra kết quả hiển thị.

## Điều gì giúp các lựa chọn hữu ích

- **Tham khảo thực tế:** mỗi vòng nghiên cứu các dịch vụ có cùng tính năng hoặc vai trò tương tự, cùng với thực hành thiết kế hiện hành.
- **So sánh công bằng:** các phương án thị giác dùng chung nội dung chữ đã được duyệt; những quyết định thiết kế đã chốt được giữ nguyên.
- **Phương án có thể sử dụng:** cách hiển thị và điều hướng trong trình duyệt được kiểm tra trước khi bàn giao, kèm URL truy cập được để bạn đánh giá trên thiết bị của mình.
- **Lịch sử quyết định:** `docs/picky-client.md` trong dự án ghi lại các phương án, nghiên cứu, kiểm tra và phương án thắng. Đặc tả đã chốt được lưu tại `docs/picky-client-design.md`.
- **Bản dựng production sạch:** môi trường đánh giá tạm thời và các dòng mã nối nó vào ứng dụng được gỡ bỏ, sau đó đầu ra production được kiểm tra để bảo đảm không chứa chúng.

Môi trường đánh giá được cung cấp sử dụng React, TypeScript, Vite, React Router, Tailwind và Motion. Với các bộ công nghệ khác, cần điều chỉnh các điểm tích hợp; sản phẩm native dùng bản xem trước trên web trước khi áp dụng trong bộ công nghệ riêng. Môi trường có tác nhân phụ sẽ giao việc xây dựng và đánh giá cho các tác nhân đó. Các môi trường khác thực hiện từng bước tuần tự và ghi nhận việc đánh giá do cùng một tác nhân thực hiện.

## Chi tiết cài đặt

<details>
<summary>Hướng dẫn cho tác nhân, lệnh thủ công và cách gọi</summary>

### Dành cho tác nhân cài đặt

Tuân theo phương thức và phạm vi cài đặt người dùng yêu cầu. Nếu người dùng không chỉ định, dùng cách cài plugin native bên dưới cho Codex hoặc Claude Code, và ID Skills CLI tương ứng cho các môi trường khác. Plugin native mặc định cài cho người dùng hiện tại; Skills CLI mặc định cài trong dự án. Cài toàn bộ thư mục skill, bao gồm tài liệu tham khảo, script và tài nguyên. Kiểm tra rằng môi trường thực sự nhận diện skill, rồi báo cách gọi và các bước tải lại mà môi trường yêu cầu.

### Skills CLI

Skill chuẩn nằm tại [skills/picky-client](../../skills/picky-client). Chạy [Skills CLI](https://github.com/vercel-labs/skills) từ thư mục dự án với Node.js 22.20.0 trở lên:

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

Chọn tác nhân khi được hỏi hoặc chỉ định trực tiếp:

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| Tác nhân | ID `--agent` |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode, bao gồm oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

Thêm `-g` để cài vào vị trí của tác nhân dùng chung cho người dùng hiện tại. Để cài thủ công trong dự án, sao chép toàn bộ thư mục `skills/picky-client` vào `.agents/skills/`, được [OpenCode](https://opencode.ai/docs/skills/) và [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide) hỗ trợ. oh-my-opencode dùng cách cài skill của OpenCode.

### Plugin Claude Code

Trong terminal, với Claude Code 2.1.292 trở lên:

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

Cách thay thế cho phiên bản cũ hơn:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

Trong phiên làm việc, phiên bản 2.1.275 trở lên hỗ trợ `/plugin install picky-client --marketplace daviddev90/picky-client`. Xem [cài đặt plugin Claude Code](https://code.claude.com/docs/en/discover-plugins).

### Plugin Codex

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

Dùng `/plugins` trong Codex để duyệt các plugin. Xem [tài liệu tham chiếu Codex CLI](https://learn.chatgpt.com/docs/cli/reference).

Cả hai plugin dùng thư mục chuẩn `skills/` ở gốc kho mã. [plugin.json](../../plugin.json) ở gốc đóng gói plugin dùng được giữa các môi trường và plugin Codex; [.claude-plugin/plugin.json](../../.claude-plugin/plugin.json) cung cấp khả năng tương thích với Claude Code. Xem [đóng gói plugin](https://developers.openai.com/plugins/build/plugins).

### Gọi trực tiếp

| Cách cài đặt | Cách gọi |
|---|---|
| Plugin Codex | `$picky-client:picky-client` |
| Skill độc lập cho Codex | `$picky-client` |
| Plugin Claude Code | `/picky-client:picky-client` |
| Skill độc lập cho Claude Code | `/picky-client` |

Với các tác nhân khác, hãy yêu cầu dùng picky-client. Các phương án và nhãn đánh giá dùng ngôn ngữ làm việc của bạn; tên công cụ vẫn là `PICKY-CLIENT DRAFTS`.

</details>

Đọc [skill](../../skills/picky-client/SKILL.md) để biết toàn bộ quy trình.

## Giấy phép

MIT © daviddev90
