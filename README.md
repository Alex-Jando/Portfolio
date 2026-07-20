# Alexander Jando Portfolio

This is the source code repository for my personal portfolio website.

# Pages

- About
- Projects
- Resume
- Contact
- Collection

## Résumé workflow

The mechatronics résumé has one editable source file:

```text
resumes/mechatronics/resume.tex
```

Run `npm run resume:build` to regenerate both the native web résumé data and
`public/resume/EngineeringResume.pdf`. The normal production build runs this
step automatically. During development, `npm run dev` also watches the LaTeX
source and rebuilds after each save.

PDF generation uses Tectonic. Install the `tectonic` executable somewhere on
`PATH`, or set `TECTONIC_BIN` to its absolute path. If Tectonic is temporarily
unavailable, the last valid PDF is retained while the web version is updated.
