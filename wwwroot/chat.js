var client;
$(function () {
    $("[data-client]").each(function () {
        var $this = $(this);

        client = new Client();

        client.$sendField = $("<div>");
        var $text = $("<input>", {
            "class": "msg-text",
            "type": "text"
        });
        var $button = $("<button>", {
            "class": "msg-button"
        });
        $button.html("send");
        $button.click(function () {
            client.send($text.val());
            $text.val('');
        });
        client.$sendField
			.append($text)
			.append($button);

        client.$msgField = $("<div>", {
            "data-client-msg": "1", // Prevent Chrome from removing the attr
            "class": "msg-container"
        });

        client.$title = $("<h1>").html("Client");

        $this
			.append(client.$title)
			.append(client.$sendField)
			.append(client.$msgField);

        client.connect();
    });
});