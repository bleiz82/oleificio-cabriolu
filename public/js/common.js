(function () {
    var fab = document.getElementById('chatbotFab');
    var panel = document.getElementById('chatbotPanel');
    var close = document.getElementById('chatbotClose');
    if (!fab || !panel) return;

    fab.addEventListener('click', function () {
        var open = panel.classList.toggle('chatbot-panel--open');
        panel.setAttribute('aria-hidden', !open);
    });

    if (close) {
        close.addEventListener('click', function () {
            panel.classList.remove('chatbot-panel--open');
            panel.setAttribute('aria-hidden', 'true');
        });
    }
})();
