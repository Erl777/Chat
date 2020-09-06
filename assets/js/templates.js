let templates = {
    system: `
            <div class="row message-body">
              <div class="col-sm-12 message-main-system">
                <p class="system message-text">
                  {message}
                </p>
              </div>
            </div>`,
    receiver: `
            <div class="row message-body">
                  <div class="col-sm-12 message-main-receiver">
                    <div class="receiver">
                      <div class="message-text">
                       {message}
                      </div>
                      <span class="message-time pull-right">
                        {name}
                      </span>
                    </div>
                  </div>
                </div>`,
    sender: `
            <div class="row message-body">
                  <div class="col-sm-12 message-main-sender">
                    <div class="sender">
                      <div class="message-text">
                        {message}
                      </div>
                      <span class="message-time pull-right">
                        {name}
                      </span>
                    </div>
                  </div>
                </div>`
};