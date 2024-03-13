import express from "express";
import multer from "multer";
import { dirname, resolve } from "path";
import path from "path";
import { fileURLToPath } from "url";
import fs, { readdir} from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const year = new Date().getFullYear();
const dateOf = new Date().toDateString();

const upload = multer({ dest: "upload/" });

const getblogs = await readdir("public/blogs");



app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static("upload"));

app.get("/", async (req, res) => {  
    res.render("index.ejs", { year: year, getblogs: getblogs});
});

app.get("/about", (req, res) => {
    res.render("about.ejs", { year: year});
});

app.get("/contacts", (req, res) => {
    res.render("contacts.ejs", { year: year});
});

app.get("/posting", (req, res) => {
    res.render("posting.ejs", { year: year});
});

app.get("/my-blogs", upload.single('blogImg'), async (req, res) => {
    const blogsDir = await readdir("public/blogs");
    const imgDir = await readdir("upload");
    res.render("my-blogs", { year: year, arr: blogsDir, imgArr: imgDir, capitalize: capitalize });
    console.log(imgDir, blogsDir);
});

for (let i = 0; i < getblogs.length; i++) {
    app.get(`/blog/${i + 1}`, async (req, res) => {
        const blogsDir = await readdir("public/blogs");
        res.sendFile(`./public/blogs/${blogsDir[i + 1]}`);
    });
}

app.post("/my-blogs", upload.single('file-1'), async (req,res) =>{
   try {
    res.charset = 'UTF-8';
    let blogsDir = await readdir("public/blogs");
    const imgDir = await readdir("upload");
    console.log(req.file);
    saveImage(imgDir, req.file);
    const {author , title, subTitle, cont, gender} = req.body;
    const imageFileName = (imgDir.length - 1) +"-" + req.file.originalname;
    const sanitizeTitle =`${blogsDir.length}-${title.toLowerCase().replace(/\s+/g, '-').replace(/["']/g, '').replace(/[:]/g, '')}.html` 
    const rutaArchivo = path.join(__dirname, "public", "blogs", sanitizeTitle);
    const contenidoHTML=
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>${title}</title>
</head>
<body>
    <nav class="flexbox">
        <div class="flex-i">
            <a href="/"><img class="logo" src="../images/logo.png" width="200" alt="logo"></a>
        </div>
        <div class="flex-i">
            <button class="create-btn btn"><a class="link link-c" href="/posting"><i class="bi bi-plus"></i></a></button>
        </div>
        <button id="open" class="flex-i hamburguer"><i class="bi bi-list"></i></svg></button>
        <div class="flex-i nav">
            <button id="close" class="close-btn"><i class="bi bi-x"></i></button>
            <ul class="nav-list list">
                <li class="nav-link">
                    <a class="link" href="/">Home</a>
                </li>
                <li class="nav-link list">
                    <a class="link" href="/about">About</a>                    
                </li>
                <li class="nav-link list">
                    <a class="link" href="/contacts">Contacts</a>                    
                </li>
                <li class="nav-link list">
                    <a class="link" href="/my-blogs">My Blogs</a>                    
                </li>
            </ul>
        </div>
    </nav>
    <aside id="blog-aside">
        <ul class="list aside-l">
            <li>
                <a target="_blank" href="https://www.linkedin.com/in/martin-castro-torán-071334273/"><img class="media-logo" src="../images/linkedin.png" alt="linkedin-logo"></a>
            </li>
            <li>
                <a target="_blank" href="https://www.instagram.com/martin_castro_t/"><img class="media-logo" src="../images/ig.png"alt="instagram-logo"></a>
            </li>
            <li>
                <a target="_blank" href="https://github.com/MartinCastroToran?tab=repositories"><img class="media-logo" src="../images/github.png" alt="github-logo"></a> 
        </li>
        </ul>
    </aside>
    <main>
    <section class="flex-main">
        <div class="flex-cont">
            <div class="blog-header">
                <h1 class="blog-title">${title}</h1>
                <ul>
                    <li class="inline-item">
                        <span>${gender}</a>
                    </li>
                    <li class="inline-item">
                        <span >${dateOf}</a><br>
                    </li>
                </ul>
            </div>
            <div class="blog-img-cont">
                <img class="blog-img"  src="/${imageFileName}">
                <h4 class="blog-subtitle">${subTitle}</h4>
            </div>
            <article id="blog-article">
                <p class="blog-cont">
                    ${cont}
                </p>
                <span class="blog-author">${author}</span>
            </article>
            <div>
                <button class="btn btn-p edit-btn">Edit Blog</button>
                <button class=" btn btn-p delete-btn"><a class="link link-c" href="/my-blog">Delete Blog</button>    
            </div>            
        </div>        
    </div>
    </section>
    <footer id="footer" class="flexbox">
        <div class="footer-sec flex-i">
            <ul class="list">
                <li>
                    <a target="_blank" href="https://www.linkedin.com/in/martin-castro-torán-071334273/"><img class="media-logo" src="../images/linkedin.png" alt="linkedin-logo"></a>
                </li>
                <li>
                    <a target="_blank" href="https://www.instagram.com/martin_castro_t/"><img class="media-logo" src="../images/ig.png"alt="instagram-logo"></a>
                </li>
                <li>
                    <a target="_blank" href="https://github.com/MartinCastroToran?tab=repositories"><img class="media-logo" src="../images/github.png" alt="github-logo"></a> 
                </li>
            </ul>   
        </div>
        <div class="footer-sec flex-i">
            <ul class="list">
                <li>
                    <h4>Contact me:</p>
                </li>
                <li>
                    <p>+54 381-603-2728</p>
                </li>
            </ul>


        </div>
        <div class="footer-end flex-i">
            <ul class="list">
                <li>
                    <p>© ${year} All right reserved.</p>
                </li>
            </ul>
        </div>
    </footer>
</main>
<script
src="https://code.jquery.com/jquery-3.7.1.min.js"
integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
crossorigin="anonymous"></script>
<script src="../scripts/responsive.js"></script>
<script src="../scripts/edit.js"></script>
<script src="../scripts/delete.js"></script>
</body>
</html>
    </body>
    </html>
  `;
    await new Promise(resolve => setTimeout(resolve, 2000));
    await fs.writeFile(rutaArchivo, contenidoHTML);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    blogsDir = await fs.readdir("public/blogs");
    console.log(sanitizeTitle, blogsDir);
    res.redirect("/my-blogs");  
} catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
} 
});

for (let i = 0; i < getblogs.length; i++) {
    app.patch(`/blog-editor`, upload.single('blogImg'), async (req, res) =>{

        const {author , title, subTitle, cont, gender} = req.body;

        if (!author && !title && !subTitle && !cont && !gender) {
            return res.status(400).json("No fields provided for update");
        }

        const blogsDir = await fs.readdir("./public/blogs");
        const blogFilePath = path.join(blogsDir, `${getblogs[i]}.html`);
        const imgDir = await readdir("upload");
        const currentContent = await fs.readFile(blogFilePath, 'utf-8');
        saveImage(imgDir, req.file);
        let editedContent = currentContent;
        if (author) {
            editedContent = currentContent.replace(
                /<span class="blog-author">.*<\/span>/,
                `<span class="blog-author">${author}</span>`
            );
        }
        if (title) {
            editedContent = currentContent.replace(
                /<title>.*<\/title>/,
                `<title>${title}</title>`
            ).replace(
                /<h1 class="blog-title">.*<\/h1>/,
                `<h1 class="blog-title">${title}</h1>`
            )
        }
        if (subTitle) {
            editedContent = currentContent.replace(
                /<h4 class="blog-subtitle">.*<\/h4>/,
                `<h4 class="blog-subtitle">${subTitle}</h4>`
            )
        }
        if (cont) {
            editedContent = currentContent.replace(
                /<p class="blog-cont">.*<\/p>/,
                `<p class="blog-cont">${cont}</p>`
            )
        };
        if (gender) {
            editedContent = currentContent.replace(
                /<span class="blog-gender">.*<\/span>/,
                `<span class="blog-gender">${gender}</span>`
            )
        };

        const blogExists = await fs.access(blogFilePath).then(() => true).catch(() => false);
        if(blogExists){
            await fs.writeFile(blogFilePath, editedContent);
        }
        else{
            res.status(404).json("blog no encontrado");
        }
        res.redirect("/my-blogs");
    })
}

for (let i = 0; i < getblogs.length; i++) {
    app.delete(`/blog/${getblogs[i]}`, async (req, res) =>{
        const blogsDir = await fs.readdir("./public/blogs")
        const deleteBlog = await fs.unlink(`./public/blogs/${blogsDir[i]}`);
        res.redirect("/my-blogs")
    })
}


async function saveImage(imgDir, file) {
    const newPath = `./upload/${imgDir.length - 1}-${file.originalname}`;
    await fs.rename(file.path, newPath);
}


async function getFilesSortedByDate(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);

        // Obtener información sobre cada archivo, incluida su fecha de modificación
        const fileStats = await Promise.all(files.map(async file => {
            const filePath = path.join(directoryPath, file);
            const stat = await fs.stat(filePath);
            return {
                name: file,
                date: stat.mtime
            };
        }));

        // Ordenar los archivos por fecha de modificación (en orden descendente)
        const sortedFiles = fileStats.sort((a, b) => b.date - a.date);

        return sortedFiles.map(file => file.name);
    } catch (error) {
        console.error('Error al obtener y ordenar archivos:', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
}

function capitalize(frase) {
    return frase.charAt(1).toUpperCase() + frase.slice(2);
}

class BlogItems {
    constructor(title, subTitle, cont, imageFileName, gender, author, year, formLoaded, arr) {
        this.title = title;
        this.subTitle = subTitle;
        this.cont = cont;
        this.imageFileName = imageFileName;
        this.gender = gender;
        this.author = author;
        this.dateOf = dateOf;
        this.year = year;
        this.formLoaded = formLoaded;
        this.arr = arr;
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
