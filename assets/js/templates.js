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
                        {time}
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
                        {time}
                      </span>
                    </div>
                  </div>
                </div>`,
    sidebarUser: `<div class="row sideBar-body" data-user={name}>
            <div class="col-sm-3 col-xs-3 sideBar-avatar">
              <div class="avatar-icon">
                <img src="{img}">
              </div>
            </div>
            <div class="col-sm-9 col-xs-9 sideBar-main">
              <div class="row">
                <div class="col-sm-8 col-xs-8 sideBar-name">
                  <span class="name-meta">{name}
                </span>
                </div>
                <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                  <span class="time-meta pull-right">18:18
                </span>
                </div>
              </div>
            </div>
          </div>`
};