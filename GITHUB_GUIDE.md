# Comment synchroniser ce projet avec GitHub

Puisque nous avons initialisé le repository localement (`git init`), voici comment le mettre sur GitHub avec **GitHub Desktop** ou en **Ligne de commande**.

## Option 1 : Avec GitHub Desktop (Recommandé)

1.  Ouvrez **GitHub Desktop**.
2.  Allez dans **File** > **Add Local Repository...**
3.  Cliquez sur **Choose...** et sélectionnez le dossier : `I:\Sites\problem-first-db`.
4.  Cliquez sur **Add Repository**.
5.  Vous verrez maintenant le repository dans la liste à gauche.
6.  Cliquez sur le bouton **Publish repository** (en haut dans la barre d'outils).
7.  Donnez un nom (ex: `problem-first-db`) et décochez "Keep this code private" si vous voulez qu'il soit public.
8.  Cliquez sur **Publish Repository**.

C'est tout ! Votre code est maintenant sur GitHub.

## Option 2 : En Ligne de Commande

Si vous préférez le faire manuellement :

1.  Allez sur [GitHub.com](https://github.com) et créez un **Nouveau Repository** (bouton "+" en haut à droite).
    *   Nom: `problem-first-db`
    *   **Ne pas** cocher "Initialize with README" (on l'a déjà).
2.  Copiez l'URL du repo (ex: `https://github.com/VOTRE_USER/problem-first-db.git`).
3.  Ouvrez un terminal dans `I:\Sites\problem-first-db`.
4.  Tapez :
    ```bash
    git remote add origin https://github.com/VOTRE_USER/problem-first-db.git
    git add .
    git commit -m "Initial commit: Structure du projet"
    git branch -M main
    git push -u origin main
    ```
