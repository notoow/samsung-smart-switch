from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
FONTS = ASSETS / "fonts"
OUTPUT = ASSETS / "og-image-v4.png"


def load_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONTS / name
    return ImageFont.truetype(str(path), size=size)


def draw_background(canvas: Image.Image) -> None:
    width, height = canvas.size
    draw = ImageDraw.Draw(canvas)

    for y in range(height):
        t = y / max(height - 1, 1)
        r = int(58 + (180 - 58) * t)
        g = int(121 + (196 - 121) * t)
        b = int(222 + (238 - 222) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.ellipse((-180, -180, width * 0.58, height * 0.9), fill=(95, 173, 255, 76))
    od.ellipse((width * 0.62, -110, width + 180, height * 0.62), fill=(76, 191, 255, 74))
    od.ellipse((width * 0.56, height * 0.24, width + 210, height + 150), fill=(55, 89, 176, 56))
    canvas.alpha_composite(overlay)


def rounded_panel(canvas: Image.Image) -> None:
    width, height = canvas.size
    panel_margin_x = 40
    panel_margin_y = 42
    panel = Image.new("RGBA", (width - panel_margin_x * 2, height - panel_margin_y * 2), (255, 255, 255, 238))
    mask = Image.new("L", panel.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, panel.size[0], panel.size[1]), radius=30, fill=255)
    canvas.paste(panel, (panel_margin_x, panel_margin_y), mask)


def generate() -> None:
    image = Image.new("RGBA", (1200, 630), (0, 0, 0, 255))
    draw_background(image)
    rounded_panel(image)
    draw = ImageDraw.Draw(image)

    color_brand = (28, 83, 198)
    color_text = (26, 46, 86)
    color_muted = (95, 117, 151)

    content_left = 86

    tag_font = load_font("Pretendard-SemiBold.otf", 24)
    title_font = load_font("Pretendard-Bold.otf", 72)
    subtitle_font = load_font("Pretendard-Regular.otf", 38)
    chip_font = load_font("Pretendard-Medium.otf", 30) if (FONTS / "Pretendard-Medium.otf").exists() else load_font("Pretendard-Regular.otf", 30)

    # Soft pill
    pill = Image.new("RGBA", (248, 50), (229, 239, 255, 255))
    pill_mask = Image.new("L", pill.size, 0)
    ImageDraw.Draw(pill_mask).rounded_rectangle((0, 0, pill.size[0], pill.size[1]), radius=25, fill=255)
    image.paste(pill, (86, 86), pill_mask)
    draw.text((112, 98), "SMART SWITCH", font=tag_font, fill=(45, 101, 212))

    # Cleaner hierarchy and larger negative space
    draw.text((content_left, 170), "Galaxy S26 셀프 이전", font=title_font, fill=color_brand)
    draw.text((content_left, 255), "체크메이트", font=title_font, fill=color_brand)
    draw.text((content_left, 354), "데이터 이동부터 유심 전환까지, 필요한 순서만 깔끔하게.", font=subtitle_font, fill=color_text)

    chips = ["필수 항목 경고", "카카오톡 이전", "진행률 · 메모"]
    chip_x = content_left
    chip_y = 432
    chip_gap = 14
    for text in chips:
        text_box = draw.textbbox((0, 0), text, font=chip_font)
        chip_w = (text_box[2] - text_box[0]) + 46
        chip_h = 52
        chip_box = Image.new("RGBA", (chip_w, chip_h), (236, 243, 255, 255))
        chip_mask = Image.new("L", (chip_w, chip_h), 0)
        ImageDraw.Draw(chip_mask).rounded_rectangle((0, 0, chip_w, chip_h), radius=20, fill=255)
        image.paste(chip_box, (chip_x, chip_y), chip_mask)
        draw.text((chip_x + 23, chip_y + 11), text, font=chip_font, fill=color_muted)
        chip_x += chip_w + chip_gap

    image.convert("RGB").save(OUTPUT, format="PNG", optimize=True)


if __name__ == "__main__":
    generate()
