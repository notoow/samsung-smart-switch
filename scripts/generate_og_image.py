from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
FONTS = ASSETS / "fonts"
OUTPUT = ASSETS / "og-image-v2.png"


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

    tag_font = load_font("Pretendard-Bold.otf", 28)
    title_font = load_font("Pretendard-Bold.otf", 76)
    body_font = load_font("Pretendard-SemiBold.otf", 46)
    bullet_font = load_font("Pretendard-Regular.otf", 38)
    foot_font = load_font("Pretendard-Regular.otf", 28)

    tag_box = Image.new("RGBA", (290, 58), (35, 113, 245, 255))
    tag_mask = Image.new("L", tag_box.size, 0)
    ImageDraw.Draw(tag_mask).rounded_rectangle((0, 0, tag_box.size[0], tag_box.size[1]), radius=29, fill=255)
    image.paste(tag_box, (72, 82), tag_mask)
    draw.text((102, 96), "SMART SWITCH", font=tag_font, fill=(255, 255, 255))

    draw.text((74, 190), "Galaxy S26 셀프 이전 체크메이트", font=title_font, fill=color_brand)
    draw.text((74, 304), "데이터 이동부터 유심 전환까지", font=body_font, fill=color_text)
    draw.text((74, 362), "단계별 체크로 차분하게 완료하세요.", font=body_font, fill=color_text)

    bullets = [
      "필수 항목 누락 시 위험 알림 제공",
      "카카오톡 / Smart Switch 실전 순서 반영",
      "진행률 · 메모 · 상태 백업 지원",
    ]
    y = 450
    for text in bullets:
      draw.ellipse((74, y + 12, 90, y + 28), fill=color_dot)
      draw.text((112, y), text, font=bullet_font, fill=color_muted)
      y += 56

    draw.text((74, 578), "Unofficial helper for Galaxy device migration", font=foot_font, fill=(102, 123, 160))

    image.convert("RGB").save(OUTPUT, format="PNG", optimize=True)


if __name__ == "__main__":
    generate()
