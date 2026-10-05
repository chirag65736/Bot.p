import React from 'react'
import './App.css'

const modules = [
  { name: 'parse_args()', desc: 'Parses CLI flags: interface, channel, skip MAC, max clients, packet count, world mode.' },
  { name: 'get_mon_iface()', desc: 'Detects or selects a wireless interface and switches it to monitor mode.' },
  { name: 'iwconfig()', desc: 'Runs the system iwconfig command to list wireless interfaces and monitor-mode adapters.' },
  { name: 'start_mon_mode()', desc: 'Brings the interface down, sets it to monitor mode, then brings it back up.' },
  { name: 'channel_hop()', desc: 'Cycles through Wi-Fi channels (1–11 or 1–13) to discover APs and clients on each.' },
  { name: 'deauth()', desc: 'Constructs and sends Dot11Deauth frames to disconnect clients from their access points.' },
  { name: 'cb() (sniff callback)', desc: 'Processes each captured packet — identifies APs via beacons and tracks client pairs.' },
  { name: 'APs_add()', desc: 'Extracts BSSID, channel, and ESSID from beacon/probe-response packets.' },
  { name: 'clients_APs_add()', desc: 'Records client↔AP associations from data and management frames.' },
  { name: 'output()', desc: 'Clears the terminal and prints a live table of deauthing clients and discovered APs.' },
  { name: 'stop()', desc: 'Handles Ctrl+C — restores managed mode and restarts NetworkManager on exit.' },
]

const args = [
  { flag: '-i, --interface', desc: 'Specify monitor-mode interface' },
  { flag: '-c, --channel', desc: 'Listen on and target a specific channel' },
  { flag: '-s, --skip', desc: 'Skip deauthing this MAC address' },
  { flag: '-a, --accesspoint', desc: 'Target a specific AP MAC address' },
  { flag: '-m, --maximum', desc: 'Max number of clients to deauth' },
  { flag: '-p, --packets', desc: 'Number of deauth packets per burst (default: 1)' },
  { flag: '-t, --timeinterval', desc: 'Time interval between packet bursts' },
  { flag: '-d, --directedonly', desc: 'Skip broadcast deauth to APs' },
  { flag: '-n, --noupdate', desc: 'Do not clear deauth list when max is reached' },
  { flag: '--world', desc: 'Enable scanning of channels 1–13' },
]

const flowSteps = [
  { title: '1. Interface Setup', desc: 'Detect wireless adapter → enable monitor mode via iwconfig' },
  { title: '2. Channel Hopping', desc: 'Cycle through channels 1–11 (or 1–13) to discover all APs and clients' },
  { title: '3. Packet Sniffing', desc: 'Scapy sniffs 802.11 frames — beacons, probe responses, data frames' },
  { title: '4. Target Identification', desc: 'Callback extracts BSSID, ESSID, channel, and client↔AP pairs' },
  { title: '5. Deauth Injection', desc: 'Forged Dot11Deauth frames sent to disconnect clients from their AP' },
  { title: '6. Live Display', desc: 'Terminal shows real-time table of targets and discovered access points' },
]

const objectives = [
  { icon: '🎯', title: 'Demonstrate the Vulnerability', desc: 'Show how unencrypted 802.11 management frames allow deauthentication attacks without network credentials.' },
  { icon: '🔍', title: 'Understand Packet-Level Mechanics', desc: 'Analyze the exact 802.11 frame structure — Dot11, Dot11Deauth, RadioTap — used in the attack.' },
  { icon: '🛡️', title: 'Evaluate Defense Mechanisms', desc: 'Assess effectiveness of 802.11w (PMF), WPA3, and IDS/IPS solutions against deauth attacks.' },
  { icon: '📚', title: 'Promote Security Awareness', desc: 'Educate users and network administrators about Wi-Fi security risks and best practices.' },
]

const hardwareReqs = [
  { item: 'Wireless Adapter', detail: 'Supports monitor mode & packet injection (e.g., Alfa AWUS036NHA, TP-Link TL-WN722N v1)' },
  { item: 'Linux System', detail: 'Kali Linux / Ubuntu / Debian with root access' },
  { item: 'USB / PCI', detail: 'Adapter connected via USB 2.0+ or PCIe interface' },
]

const softwareReqs = [
  { item: 'Python 3.x', detail: 'Runtime environment for the tool' },
  { item: 'Scapy', detail: 'Packet manipulation library (pip install scapy)' },
  { item: 'iw / iwconfig', detail: 'Wireless configuration utilities (Linux)' },
  { item: 'ifconfig', detail: 'Network interface management' },
  { item: 'Root privileges', detail: 'Required for raw socket access and monitor mode' },
]

const installSteps = [
  { step: '1', title: 'Clone the Repository', cmd: 'git clone <repo-url>\ncd wifi-deauth-tool' },
  { step: '2', title: 'Install Python Dependencies', cmd: 'pip install scapy' },
  { step: '3', title: 'Enable Monitor Mode (optional)', cmd: 'sudo airmon-ng start wlan0' },
  { step: '4', title: 'Run the Tool', cmd: 'sudo python3 wifi_jammer.py -i wlan0mon' },
]

const testResults = [
  { scenario: 'Open Network (No PMF)', result: 'Client disconnected instantly', status: 'Vulnerable' },
  { scenario: 'WPA2 Network (No PMF)', result: 'Client disconnected — encryption does not protect mgmt frames', status: 'Vulnerable' },
  { scenario: 'WPA2 + PMF (802.11w)', result: 'Forged deauth frames rejected by client', status: 'Protected' },
  { scenario: 'WPA3 Network', result: 'PMF mandatory — deauth frames rejected', status: 'Protected' },
  { scenario: 'Targeted Deauth (-a flag)', result: 'Only specified AP\'s clients disconnected', status: 'Targeted' },
  { scenario: 'Broadcast Deauth', result: 'All clients on channel disconnected', status: 'Broadcast' },
]

const futureScope = [
  { icon: '🤖', title: 'AI-Based Detection', desc: 'Machine learning model to detect and classify deauth attack patterns in real-time.' },
  { icon: '📊', title: 'Web Dashboard', desc: 'Browser-based monitoring interface with live charts and alert notifications.' },
  { icon: '🔐', title: 'Automated PMF Testing', desc: 'Tool to automatically verify if a network has Protected Management Frames enabled.' },
  { icon: '📱', title: 'Mobile Companion', desc: 'Android app for field testing and reporting Wi-Fi security posture.' },
]

const references = [
  { num: '[1]', text: 'IEEE Std 802.11-2020 — IEEE Standard for Information Technology, Wireless LAN MAC and PHY Specifications.' },
  { num: '[2]', text: 'IEEE Std 802.11w-2009 — Amendments: Protected Management Frames.' },
  { num: '[3]', text: 'Scapy Documentation — https://scapy.readthedocs.io' },
  { num: '[4]', text: 'Vanhoef, M. & Piessens, F. (2014). "Advanced Wi-Fi Attacks Using Commodity Hardware." USENIX Security.' },
  { num: '[5]', text: 'Wi-Fi Alliance — WPA3 Security Specification.' },
  { num: '[6]', text: 'NIST SP 800-153 — Guidelines for Securing Wireless Local Area Networks (WLANs).' },
]

const defenses = [
  { title: '802.11w (PMF)', desc: 'Protected Management Frames encrypts deauth frames, making forged ones rejected by the client.' },
  { title: 'WPA3', desc: 'Requires PMF by default, eliminating most deauth attack vectors.' },
  { title: 'Intrusion Detection', desc: 'Tools like Wireshark, Kismet, or Zeek can detect abnormal deauth frame patterns.' },
  { title: 'AP Logging', desc: 'Modern APs log deauth events — sudden bursts indicate an active attack.' },
]

export default function App() {
  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">📶 WiFi Deauth Tool</div>
        <div className="nav-links">
          <a href="#objectives">Objectives</a>
          <a href="#overview">Overview</a>
          <a href="#how">How It Works</a>
          <a href="#modules">Modules</a>
          <a href="#requirements">Requirements</a>
          <a href="#install">Installation</a>
          <a href="#cli">CLI Usage</a>
          <a href="#testing">Testing</a>
          <a href="#defenses">Defenses</a>
          <a href="#future">Future Scope</a>
          <a href="#references">References</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">⚠ Educational Purpose Only</div>
        <h1>Wi-Fi Deauthentication <span className="highlight">Tool</span></h1>
        <p>
          A Python-based tool using Scapy that demonstrates 802.11 deauthentication
          attacks — how they work, why they succeed, and how to defend against them.
        </p>
        <div className="hero-cta">
          <a href="#how" className="btn btn-primary">How It Works →</a>
          <a href="#modules" className="btn btn-ghost">View Modules</a>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-num">11</div>
            <div className="stat-label">Functions</div>
          </div>
          <div className="stat">
            <div className="stat-num">10</div>
            <div className="stat-label">CLI Flags</div>
          </div>
          <div className="stat">
            <div className="stat-num">1–13</div>
            <div className="stat-label">Channels</div>
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="section" id="objectives">
        <h2 className="section-title">Project <span className="accent">Objectives</span></h2>
        <p className="section-subtitle">
          The goals of this final year project, focused on Wi-Fi security education and awareness.
        </p>
        <div className="cards-grid">
          {objectives.map((o, i) => (
            <div className="card" key={i}>
              <div className="card-icon">{o.icon}</div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section" id="overview">
        <h2 className="section-title">Project <span className="accent">Overview</span></h2>
        <p className="section-subtitle">
          This tool demonstrates a well-known vulnerability in the 802.11 protocol:
          management frames (including deauthentication frames) are sent unencrypted
          and unauthenticated in networks without Protected Management Frames (PMF).
        </p>
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">🐍</div>
            <h3>Built with Scapy</h3>
            <p>Uses the Scapy library for packet crafting, sniffing, and injection of 802.11 frames.</p>
          </div>
          <div className="card">
            <div className="card-icon">📡</div>
            <h3>Monitor Mode</h3>
            <p>Requires a wireless adapter supporting monitor mode to sniff and inject raw frames.</p>
          </div>
          <div className="card">
            <div className="card-icon">⚡</div>
            <h3>Real-Time Sniffing</h3>
            <p>Live packet capture identifies APs and clients across all Wi-Fi channels via channel hopping.</p>
          </div>
          <div className="card">
            <div className="card-icon">🧵</div>
            <h3>Multi-Threaded</h3>
            <p>Channel hopping runs in a daemon thread while the main thread handles packet sniffing.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <h2 className="section-title">How It <span className="accent">Works</span></h2>
        <p className="section-subtitle">
          The tool follows a six-stage pipeline — from interface setup to deauth injection.
        </p>
        <div className="flow">
          {flowSteps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flow-step">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
              {i < flowSteps.length - 1 && <div className="flow-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>

        <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.15rem' }}>
          The Deauth Frame
        </h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', marginBottom: '1rem' }}>
          A deauthentication frame is a management frame (type 0, subtype 12) that tells
          a station it has been disconnected. Because these frames are unauthenticated in
          networks without PMF, an attacker can forge them:
        </p>
        <div className="code-block">
          <pre>{`# Forged deauth frame (Scapy)
deauth = (
    RadioTap() /
    Dot11(
        addr1=client_mac,   # destination (client)
        addr2=ap_mac,        # source (spoofed AP)
        addr3=ap_mac         # BSSID
    ) /
    Dot11Deauth(
        reason=7             # Class 3 frame from non-associated station
    )
)

sendp(deauth, iface=mon_iface, count=5, inter=0.1)`}</pre>
        </div>
      </section>

      {/* MODULES */}
      <section className="section" id="modules">
        <h2 className="section-title">Code <span className="accent">Modules</span></h2>
        <p className="section-subtitle">
          The tool is organized into focused functions, each handling a specific stage.
        </p>
        <div className="module-list">
          {modules.map((m, i) => (
            <div className="module-item" key={i}>
              <div className="module-name">{m.name}</div>
              <div className="module-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLI USAGE */}
      <section className="section" id="cli">
        <h2 className="section-title">CLI <span className="accent">Usage</span></h2>
        <p className="section-subtitle">
          The tool runs as root with various command-line flags for targeting and control.
        </p>
        <div className="code-block">
          <pre>{`# Basic usage (requires root + monitor mode adapter)
sudo python3 wifi_jammer.py

# Target a specific access point on channel 6
sudo python3 wifi_jammer.py -a AA:BB:CC:DD:EE:FF -c 6

# Send 5 deauth packets per burst, world channels
sudo python3 wifi_jammer.py -p 5 --world

# Skip a specific client, directed only
sudo python3 wifi_jammer.py -s 11:22:33:44:55:66 -d`}</pre>
        </div>
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.15rem' }}>
          Command-Line Arguments
        </h3>
        <div className="arg-table-wrap">
          <table className="arg-table">
            <thead>
              <tr>
                <th>Flag</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {args.map((a, i) => (
                <tr key={i}>
                  <td>{a.flag}</td>
                  <td>{a.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="section" id="requirements">
        <h2 className="section-title">System <span className="accent">Requirements</span></h2>
        <p className="section-subtitle">
          Hardware and software needed to run the tool in a controlled lab environment.
        </p>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>🔧 Hardware</h3>
        <div className="module-list" style={{ marginBottom: '2.5rem' }}>
          {hardwareReqs.map((h, i) => (
            <div className="module-item" key={i}>
              <div className="module-name">{h.item}</div>
              <div className="module-desc">{h.detail}</div>
            </div>
          ))}
        </div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>💻 Software</h3>
        <div className="module-list">
          {softwareReqs.map((s, i) => (
            <div className="module-item" key={i}>
              <div className="module-name">{s.item}</div>
              <div className="module-desc">{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTALLATION */}
      <section className="section" id="install">
        <h2 className="section-title">Installation <span className="accent">Guide</span></h2>
        <p className="section-subtitle">
          Step-by-step setup for running the tool in a controlled environment.
        </p>
        {installSteps.map((s, i) => (
          <div key={i} style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{
                background: 'var(--accent)', color: '#000', fontWeight: 700,
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0
              }}>{s.step}</span>
              <h4 style={{ fontSize: '1rem' }}>{s.title}</h4>
            </div>
            <div className="code-block" style={{ marginLeft: '2.5rem' }}>
              <pre>{s.cmd}</pre>
            </div>
          </div>
        ))}
      </section>

      {/* TESTING */}
      <section className="section" id="testing">
        <h2 className="section-title">Testing & <span className="accent">Results</span></h2>
        <p className="section-subtitle">
          Lab testing results across different network configurations and attack scenarios.
        </p>
        <div className="arg-table-wrap">
          <table className="arg-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Result</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((t, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text)', fontFamily: 'inherit' }}>{t.scenario}</td>
                  <td style={{ color: 'var(--text-dim)' }}>{t.result}</td>
                  <td>
                    <span style={{
                      padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.78rem',
                      fontWeight: 600,
                      background: t.status === 'Protected' ? 'rgba(46,213,115,0.15)' : 'rgba(255,71,87,0.15)',
                      color: t.status === 'Protected' ? 'var(--success)' : t.status === 'Targeted' ? 'var(--warning)' : 'var(--danger)',
                    }}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DEFENSES */}
      <section className="section" id="defenses">
        <h2 className="section-title">Defenses & <span className="accent">Mitigations</span></h2>
        <p className="section-subtitle">
          Understanding the attack is the first step to defending against it. Here are key mitigations.
        </p>
        <div className="defense-grid">
          {defenses.map((d, i) => (
            <div className="defense-card" key={i}>
              <h4>{d.title}</h4>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FUTURE SCOPE */}
      <section className="section" id="future">
        <h2 className="section-title">Future <span className="accent">Scope</span></h2>
        <p className="section-subtitle">
          Potential enhancements and research directions for this project.
        </p>
        <div className="cards-grid">
          {futureScope.map((f, i) => (
            <div className="card" key={i}>
              <div className="card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REFERENCES */}
      <section className="section" id="references">
        <h2 className="section-title"><span className="accent">References</span></h2>
        <p className="section-subtitle">
          Standards, papers, and documentation referenced in this project.
        </p>
        <div className="module-list">
          {references.map((r, i) => (
            <div className="module-item" key={i}>
              <div className="module-name">{r.num}</div>
              <div className="module-desc">{r.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="section">
        <div className="disclaimer">
          <h3>⚠ Legal & Ethical Disclaimer</h3>
          <p>
            This tool is presented for educational purposes only. Using deauthentication
            attacks against networks you do not own or have explicit permission to test
            is illegal in most jurisdictions. Always practice in controlled lab environments
            with your own equipment. The authors and presenters of this project assume no
            responsibility for misuse.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Wi-Fi Deauthentication Tool — Final Year Project Presentation</p>
        <p style={{ marginTop: '0.5rem' }}>Built with Python · Scapy · React</p>
      </footer>
    </div>
  )
}
