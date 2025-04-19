
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

w, h = A4
c = canvas.Canvas("hello.pdf")
c.drawString(50, h - 50, "Welcome to Reportlab!")
# set font to Times New Roman, size 54
c.setFont("Times-Roman-Italic", 54)
c.drawString(50, h - 100, "Hello World")


c.save()
