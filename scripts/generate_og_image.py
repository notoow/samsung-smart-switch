from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
FONTS = ASSETS / "fonts"
OUTPUT = ASSETS / "og-image-v3.png"


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONTS / name
    return ImageFont.truetype(str(path), size=size)


def draw_background(canvas: Image.Image) -> None:
    width, height = canvas.size
    draw = ImageDraw.Draw(canvas)

    for y in range(height):
        t = y / max(height - 1, 1)
        r = int(29 + (200 - 29) * t)
        g = int(97 + (220 - 97) * t)
        b = int(210 + (245 - 210) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.ellipse((-180, -180, width * 0.62, height * 0.92), fill=(66, 170, 255, 96))
    od.ellipse((width * 0.58, -110, width + 180, height * 0.65), fill=(36, 210, 255, 102))
    od.ellipse((width * 0.56, height * 0.22, width + 190, height + 130), fill=(22, 60, 166, 86))
    canvas.alpha_composite(overlay)


def rounded_panel(canvas: Image.Image) -> None:
    width, height = canvas.size
    panel_margin_x = 42
    panel_margin_y = 56
    panel = Image.new("RGBA", (width - panel_margin_x * 2, height - panel_margin_y * 2), (255, 255, 255, 238))
    mask = Image.new("L", panel.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, panel.size[0], panel.size[1]), radius=34, fill=255)
    canvas.paste(panel, (panel_margin_x, panel_margin_y), mask)


def generate() -> None:
    image = Image.new("RGBA", (1200, 630), (0, 0, 0, 255))
    draw_background(image)
    rounded_panel(image)
    draw = ImageDraw.Draw(image)

    color_brand = (16, 87, 210)
    color_text = (18, 35, 70)
    color_muted = (74, 98, 138)
    color_dot = (34, 180, 246)

    panel_left, panel_top = 42, 56
    panel_right, panel_bottom = 1200 - 42, 630 - 56
    content_left = 74

    tag_font = load_font("Pretendard-Bold.otf", 28)
    title_font = load_font("Pretendard-Bold.otf", 72)
    body_font = load_font("Pretendard-SemiBold.otf", 56)
    foot_font = load_font("Pretendard-Regular.otf", 26)

    tag_box = Image.new("RGBA", (290, 58), (35, 113, 245, 255))
    tag_mask = Image.new("L", tag_box.size, 0)
    ImageDraw.Draw(tag_mask).rounded_rectangle((0, 0, tag_box.size[0], tag_box.size[1]), radius=29, fill=255)
    tag_x, tag_y = 72, 74
    image.paste(tag_box, (tag_x, tag_y), tag_mask)
    draw.text((102, 88), "SMART SWITCH", font=tag_font, fill=(255, 255, 255))

    # Reduce the pill-to-title gap for tighter hierarchy.
    title_y = tag_y + 58 + 18
    title_text = "Galaxy S26 셀프 이전 체크메이트"
    draw.text((content_left, title_y), title_text, font=title_font, fill=color_brand)
    title_box = draw.textbbox((content_left, title_y), title_text, font=title_font)

    body1 = "데이터 이동부터 유심 전환까지"
    body2 = "단계별 체크로 차분하게 완료하세요."
    body1_y = title_box[3] + 20
    draw.text((content_left, body1_y), body1, font=body_font, fill=color_text)
    body1_box = draw.textbbox((content_left, body1_y), body1, font=body_font)
    body2_y = body1_box[3] + 10
    draw.text((content_left, body2_y), body2, font=body_font, fill=color_text)
    body2_box = draw.textbbox((content_left, body2_y), body2, font=body_font)

    bullets = [
      "필수 항목 누락 시 위험 알림 제공",
      "카카오톡 / Smart Switch 실전 순서 반영",
      "진행률 · 메모 · 상태 백업 지원",
    ]

    # Fit bullet block within panel bounds.
    min_bullet_top = body2_box[3] + 24
    bullet_bottom_limit = panel_bottom - 18
    chosen_font = None
    chosen_gap = 0
    chosen_heights = []

    for size, gap in [(54, 8), (50, 8), (46, 8), (42, 8), (38, 8), (34, 8)]:
        candidate_font = load_font("Pretendard-Regular.otf", size)
        heights = [draw.textbbox((0, 0), text, font=candidate_font)[3] for text in bullets]
        block_height = sum(heights) + gap * (len(bullets) - 1)
        if min_bullet_top + block_height <= bullet_bottom_limit:
            chosen_font = candidate_font
            chosen_gap = gap
            chosen_heights = heights
            break

    if chosen_font is None:
        chosen_font = load_font("Pretendard-Regular.otf", 32)
        chosen_gap = 8
        chosen_heights = [draw.textbbox((0, 0), text, font=chosen_font)[3] for text in bullets]

    y = min_bullet_top
    for text, line_height in zip(bullets, chosen_heights):
        dot_top = int(y + (line_height - 16) / 2)
        draw.ellipse((content_left, dot_top, content_left + 16, dot_top + 16), fill=color_dot)
        draw.text((content_left + 36, y), text, font=chosen_font, fill=color_muted)
        y += line_height + chosen_gap

    # Place footer outside the white panel to avoid overlap with bullets.
    draw.text((74, panel_bottom + 18), "Unofficial helper for Galaxy device migration", font=foot_font, fill=(102, 123, 160))

    image.convert("RGB").save(OUTPUT, format="PNG", optimize=True)


if __name__ == "__main__":
    generate()
