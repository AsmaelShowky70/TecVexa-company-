import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getProjects } from '../lib/storage';
import { 
  ExternalLink, 
  Sparkles, 
  Search, 
  Layers, 
  CheckCircle2, 
  X, 
  ArrowUpRight,
  Code2,
  Filter
} from 'lucide-react';
import { GithubIcon } from './Icons';

export const Portfolio = () => {
  const { t, lang, isRtl } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const categories = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'web', label: t.portfolio.filterWeb },
    { id: 'mobile', label: t.portfolio.filterMobile },
    { id: 'enterprise', label: t.portfolio.filterEnterprise },
    { id: 'api', label: t.portfolio.filterApi },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const title = (project.title_ar + ' ' + project.title_en).toLowerCase();
    const desc = (project.description_ar + ' ' + project.description_en).toLowerCase();
    const tech = (project.tech_stack || []).join(' ').toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = title.includes(query) || desc.includes(query) || tech.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="relative py-20 lg:py-28">
      
      {/* Glow background accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>{t.portfolio.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.portfolio.title}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? "بحث في المشاريع والتقنيات..." : "Search projects or tech..."}
              className={`w-full py-2 px-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-sm ${
                isRtl ? 'pr-10' : 'pl-10'
              }`}
            />
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || index}
              className="rounded-3xl glass-card border border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/50 shadow-md dark:shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Project Image Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image_url}
                    alt={lang === 'ar' ? project.title_ar : project.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  {/* Category Chip */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Index */}
                  <div className="absolute top-3 right-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold bg-slate-950/80 text-slate-300 border border-slate-800">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3">
                    <span className="text-xs font-semibold text-emerald-400">
                      {lang === 'ar' ? project.type_ar : project.type_en}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {lang === 'ar' ? project.title_ar : project.title_en}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {lang === 'ar' ? project.description_ar : project.description_en}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(project.tech_stack || []).slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {(project.tech_stack || []).length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[11px] font-mono text-slate-500">
                        +{(project.tech_stack || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <span>{t.portfolio.projectDetails}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                      title={t.portfolio.viewLiveDemo}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                      title={t.portfolio.viewSourceCode}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-base">
              {isRtl ? "لم يتم العثور على أي مشاريع مطابقة للبحث." : "No matching projects found."}
            </p>
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'ar' ? selectedProject.type_ar : selectedProject.type_en}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="h-56 sm:h-64 rounded-2xl overflow-hidden relative">
                <img
                  src={selectedProject.image_url}
                  alt="Project Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {lang === 'ar' ? selectedProject.title_ar : selectedProject.title_en}
                </h3>
                <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {lang === 'ar' ? selectedProject.description_ar : selectedProject.description_en}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  {t.portfolio.keyHighlights}
                </h4>
                <div className="space-y-2">
                  {(lang === 'ar' ? selectedProject.highlights_ar : selectedProject.highlights_en || []).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  {t.portfolio.techStackBadge}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.tech_stack || []).map((tItem, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Links */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t.portfolio.viewLiveDemo}</span>
                  </a>
                )}

                {selectedProject.repo_url && (
                  <a
                    href={selectedProject.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>{t.portfolio.viewSourceCode}</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {t.portfolio.closeModal}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
